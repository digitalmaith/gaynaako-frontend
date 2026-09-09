import { api } from "@/shared/services/api";
import type { User } from "@/features/auth/types/auth.types";
import type { RegisterFormValues } from "@/features/auth/schemas/register.schema";

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponse {
  message: string;
  email: string;
}

interface VerifyOtpPayload {
  email: string;
  code: string;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  register: async (values: RegisterFormValues): Promise<RegisterResponse> => {
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", values.role);
    formData.append("nom", values.nom);
    formData.append("prenom", values.prenom);

    if (values.role === "ENTREPRENEUR") {
      if (values.secteurId) formData.append("secteurId", values.secteurId);
      if (values.paysId) formData.append("paysId", values.paysId);
      if (values.domaineExpertise) formData.append("domaineExpertise", values.domaineExpertise);
      if (values.objectifs) formData.append("objectifs", values.objectifs);
    }

    if (values.role === "PME") {
      if (values.nomEntreprise) formData.append("nomEntreprise", values.nomEntreprise);
      values.secteurIds?.forEach((id) => formData.append("secteurIds", id));
    }

    if (values.role === "ONG") {
      if (values.nomOrganisation) formData.append("nomOrganisation", values.nomOrganisation);
      values.domainesInterventionIds?.forEach((id) => formData.append("domaineInterventionIds", id));
      if (values.mission) formData.append("mission", values.mission);
    }

    if (values.logo) {
      formData.append("logo", values.logo);
    }

    const { data } = await api.post<RegisterResponse>("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/verify-otp", payload);
    return data;
  },

  resendOtp: async (email: string): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>("/auth/resend-otp", { email });
    return data;
  },

  checkEmailAvailability: async (email: string): Promise<{ available: boolean }> => {
    const { data } = await api.get<{ available: boolean }>("/auth/check-email", {
      params: { email },
    });
    return data;
  },

  // ⚠️ endpoint supposé — à confirmer sur Swagger
  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    const { data } = await api.post<RefreshResponse>("/auth/refresh", { refreshToken });
    return data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>("/auth/forgot-password", { email });
  return data;
},

resetPassword: async (payload: {
  email: string;
  code: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>("/auth/reset-password", payload);
  return data;
},
};
