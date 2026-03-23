import { createRouter, createWebHistory } from "vue-router";
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
    path: "auth/microsoft/callback",
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const isAdminUser = () => {
  const user = getUserFromStorage();
  const role = user?.role;
  return role ? String(role).toLowerCase() === "admin" : false;
};

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if ((to.path === "/login" || to.path === "/signup") && token) {
    return next(isAdminUser() ? "/dashboard" : "/my-tickets");
  }

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!token) {
      return next("/login");
    }
  }

  if (to.matched.some((route) => route.meta.requiresAdmin)) {
    if (!isAdminUser()) {
      return next("/my-tickets");
    }
  }

  next();
});

export default router;
