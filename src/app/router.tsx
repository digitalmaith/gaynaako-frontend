/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/shared/components/guards/ProtectedRoute";
import { RoleGuard } from "@/shared/components/guards/RoleGuard";
import { GuestGuard } from "@/shared/components/guards/GuestGuard";
import { Unauthorized } from "@/shared/components/Unauthorized";
import { NotFound } from "@/shared/components/NotFound";
import { RouteError } from "@/shared/components/RouteError";
import { withSuspense } from "@/shared/utils/withSuspense";
import { Role } from "@/features/auth/types/auth.types";

// --- Public ---
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));

// --- Auth (invités) ---
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const VerifyEmailPage = lazy(() => import("@/features/auth/pages/VerifyEmailPage"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/features/auth/pages/ResetPasswordPage"));

// --- Layout + redirection ---
const DashboardLayout = lazy(() => import("@/shared/layout/DashboardLayout"));
const RoleBasedRedirect = lazy(() =>
  import("@/shared/components/RoleBasedRedirect").then((m) => ({
    default: m.RoleBasedRedirect,
  }))
);

// --- Zone protégée (user) ---
const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const DocumentsPage = lazy(() => import("@/features/documents/pages/DocumentsPage"));
const CandidaturesPage = lazy(() => import("@/features/candidatures/pages/CandidaturesPage"));
const CandidatureDetailPage = lazy(() => import("@/features/candidatures/pages/CandidatureDetailPage"));
const ProfilePage = lazy(() => import("@/features/profil/pages/ProfilePage"));
const OpportunitiesListPage = lazy(() => import("@/features/opportunities/pages/OpportunitiesListPage"));
const OpportunityDetailPage = lazy(() => import("@/features/opportunities/pages/OpportunityDetailPage"));

// --- Zone admin ---
const AdminPage = lazy(() => import("@/features/admin/pages/AdminPage"));
const AdminUsersPage = lazy(() => import("@/features/admin/pages/AdminUsersPage"));
const AdminOpportunitiesPage = lazy(() => import("@/features/admin/pages/AdminOpportunitiesPage"));
const AdminLogsPage = lazy(() => import("@/features/admin/pages/AdminLogsPage"));

export const router = createBrowserRouter([
  // ─────────────────────────────────────────────
  // PUBLIC
  // ─────────────────────────────────────────────
  {
    path: "/",
    element: withSuspense(LandingPage),
    errorElement: <RouteError />,
  },

  // ─────────────────────────────────────────────
  // AUTH (invités uniquement)
  // ─────────────────────────────────────────────
  {
    element: <GuestGuard />,
    errorElement: <RouteError />,
    children: [
      { path: "/login", element: withSuspense(LoginPage) },
      { path: "/register", element: withSuspense(RegisterPage) },
      { path: "/verify-email", element: withSuspense(VerifyEmailPage) },
      { path: "/forgot-password", element: withSuspense(ForgotPasswordPage) },
      { path: "/reset-password", element: withSuspense(ResetPasswordPage) },
    ],
  },

  // ─────────────────────────────────────────────
  // PROTÉGÉ (utilisateur connecté)
  // ─────────────────────────────────────────────
  {
    element: <ProtectedRoute />,
    errorElement: <RouteError />,
    children: [
      {
        path: "/app",
        element: withSuspense(DashboardLayout),
        children: [
          // "/app" → redirige selon le rôle
          { index: true, element: withSuspense(RoleBasedRedirect) },

          // Routes user
          { path: "dashboard", element: withSuspense(DashboardPage) },
          { path: "documents", element: withSuspense(DocumentsPage) },
          { path: "candidatures", element: withSuspense(CandidaturesPage) },
          { path: "candidatures/:id", element: withSuspense(CandidatureDetailPage) },
          { path: "profile", element: withSuspense(ProfilePage) },
          { path: "opportunities", element: withSuspense(OpportunitiesListPage) },
          { path: "opportunities/:id", element: withSuspense(OpportunityDetailPage) },

          // Routes admin (guard rôle)
          {
            element: <RoleGuard allowedRoles={[Role.ADMIN]} />,
            children: [
              { path: "admin", element: withSuspense(AdminPage) },
              { path: "admin/users", element: withSuspense(AdminUsersPage) },
              { path: "admin/opportunities", element: withSuspense(AdminOpportunitiesPage) },
              { path: "admin/logs", element: withSuspense(AdminLogsPage) },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // ERREURS
  // ─────────────────────────────────────────────
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
]);