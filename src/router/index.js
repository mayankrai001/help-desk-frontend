import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import LoginView from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "SignupView",
    component: () => import("@/views/Signup.vue"),
  },
  {
    path: "/auth/microsoft/callback",
    name: "AuthCallbackView",
    component: () => import("@/views/AuthCallback.vue"),
  },
  {
    path: "/raise-ticket",
    component: () => import("@/views/dashboard/RaiseTicket.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/my-tickets",
    component: () => import("@/views/dashboard/MyTickets.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/manage-admins",
    name: "ManageAdmins",
    component: () => import("@/views/dashboard/ManageAdmins.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Wait for the auth status to be checked from the backend
  if (!store.getters["auth/isAuthChecked"]) {
    await store.dispatch("auth/checkAuth");
  }

  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const user = store.getters["auth/currentUser"];
  const isAdmin = user?.role && String(user.role).toLowerCase() === "admin";

  if ((to.path === "/login" || to.path === "/signup") && isAuthenticated) {
    return next(isAdmin ? "/dashboard" : "/my-tickets");
  }

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next("/login");
    }
  }

  if (to.matched.some((route) => route.meta.requiresAdmin)) {
    if (!isAdmin) {
      return next("/my-tickets");
    }
  }

  next();
});

export default router;
