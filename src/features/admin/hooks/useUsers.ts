import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  fetchUsers,
  deleteUser,
  restoreUser,
  updateUserStatut,
  type AdminUser,
  type ListUsersParams,
  type UserStatut,
} from "../api/users.api";

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface State {
  items: AdminUser[];
  meta: Meta | null;
  loading: boolean;
  error: string | null;
  params: ListUsersParams;
}

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; items: AdminUser[]; meta: Meta | null }
  | { type: "LOAD_ERROR"; error: string }
  | { type: "SET_PARAMS"; params: ListUsersParams }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE"; user: AdminUser };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };

    case "LOAD_SUCCESS":
      return { ...state, loading: false, items: action.items, meta: action.meta };

    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.error };

    case "SET_PARAMS":
      return { ...state, params: action.params };

    case "REMOVE":
      return { ...state, items: state.items.filter((u) => u.id !== action.id) };

    case "UPDATE":
      return {
        ...state,
        items: state.items.map((u) => (u.id === action.user.id ? action.user : u)),
      };

    default:
      return state;
  }
}

export function useUsers(initialParams: ListUsersParams = {}) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    meta: null,
    loading: true,
    error: null,
    params: { page: 1, limit: 20, inclureSupprimes: false, ...initialParams },
  });

  const isFirstLoad = useRef(true);
  const abortRef = useRef<AbortController | null>(null);

  // ⚠️ On ne fait AUCUN setState synchrone dans l'effet
  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    // Le LOAD_START est dispatch dans une microtask → pas synchrone
    if (!isFirstLoad.current) {
      queueMicrotask(() => {
        if (!controller.signal.aborted) {
          dispatch({ type: "LOAD_START" });
        }
      });
    }

    fetchUsers(state.params)
      .then((res) => {
        if (controller.signal.aborted) return;
        dispatch({
          type: "LOAD_SUCCESS",
          items: res.items,
          meta: res.meta ?? null,
        });
        isFirstLoad.current = false;
      })
      .catch((e) => {
        if (controller.signal.aborted) return;
        if (e instanceof Error && e.name === "AbortError") return;
        dispatch({
          type: "LOAD_ERROR",
          error: e instanceof Error ? e.message : "Erreur de chargement",
        });
        isFirstLoad.current = false;
      });

    return () => {
      controller.abort();
    };
  }, [state.params]);

  // ─── Setters ───
  const setParams = useCallback(
    (
      updater:
        | Partial<ListUsersParams>
        | ((p: ListUsersParams) => Partial<ListUsersParams>)
    ) => {
      dispatch({
        type: "SET_PARAMS",
        params:
          typeof updater === "function"
            ? { ...state.params, ...updater(state.params) }
            : { ...state.params, ...updater },
      });
    },
    [state.params]
  );

  // ─── Actions ───
  const remove = async (id: string) => {
    await deleteUser(id);
    dispatch({ type: "REMOVE", id });
  };

  const restore = async (id: string) => {
    const updated = await restoreUser(id);
    dispatch({ type: "UPDATE", user: updated });
  };

  const changeStatut = async (id: string, statut: UserStatut) => {
    const updated = await updateUserStatut(id, statut);
    dispatch({ type: "UPDATE", user: updated });
  };

  const refetch = useCallback(() => {
    isFirstLoad.current = false;
    dispatch({ type: "LOAD_START" });
  }, []);

  return {
    items: state.items,
    meta: state.meta,
    loading: state.loading,
    error: state.error,
    params: state.params,
    setParams,
    refetch,
    remove,
    restore,
    changeStatut,
  };
}