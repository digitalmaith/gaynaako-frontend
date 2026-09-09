/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/shared/components/guards/ProtectedRoute";
import { RoleGuard } from "@/shared/components/guards/RoleGuard";
import { GuestGuard } from "@/shared/components/guards/GuestGuard";
import { Unauthorized } from "@/shared/components/Unauthorized";
import { NotFound } from "@/shared/components/NotFound";
import { withSuspense } from "@/shared/utils/withSuspense";
import { Role } from "@/features/auth/types/auth.types";


const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage"));
// --- Lazy imports (feature-based) ---
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const VerifyEmailPage = lazy(() => import("@/features/auth/pages/VerifyEmailPage"));

const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const OpportunitiesListPage = lazy(() => import("@/features/opportunities/pages/OpportunitiesListPage"));
const OpportunityDetailPage = lazy(() => import("@/features/opportunities/pages/OpportunityDetailPage"));

const AdminUsersPage = lazy(() => import("@/features/admin/pages/AdminUsersPage"));
const AdminOpportunitiesPage = lazy(() => import("@/features/admin/pages/AdminOpportunitiesPage"));
const AdminLogsPage = lazy(() => import("@/features/admin/pages/AdminLogsPage"));
const ProfilePage = lazy(() => import("@/features/profil/pages/ProfilePage"));

const ForgotPasswordPage = lazy(() => import("@/features/auth/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/features/auth/pages/ResetPasswordPage"));

const AppLayout = lazy(() => import("@/shared/components/layout/AppLayout"));

export const router = createBrowserRouter([
  { path: "/", element: withSuspense(LandingPage) },

  {
    element: <GuestGuard />,
    children: [
      { path: "/login", element: withSuspense(LoginPage) },
      { path: "/register", element: withSuspense(RegisterPage) },
      { path: "/verify-email", element: withSuspense(VerifyEmailPage) },
      { path: "/forgot-password", element: withSuspense(ForgotPasswordPage) },
      { path: "/reset-password", element: withSuspense(ResetPasswordPage) },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: withSuspense(AppLayout),
        children: [
          { path: "/dashboard", element: withSuspense(DashboardPage) },
          { path: "/profile", element: withSuspense(ProfilePage) },
          { path: "/", element: <Navigate to="/profile" replace /> },
          
          { path: "/opportunities", element: withSuspense(OpportunitiesListPage) },
          { path: "/opportunities/:id", element: withSuspense(OpportunityDetailPage) },

          {
            element: <RoleGuard allowedRoles={[Role.ADMIN]} />,
            children: [
              { path: "/admin/users", element: withSuspense(AdminUsersPage) },
              { path: "/admin/opportunities", element: withSuspense(AdminOpportunitiesPage) },
              { path: "/admin/logs", element: withSuspense(AdminLogsPage) },
            ],
          },
        ],
      },
    ],
  },

  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
]);