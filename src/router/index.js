import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/Login.vue";
// import Signup from "@/views/Signup.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
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
  // {
  //   path: "/signup",
  //   name: "Signup",
  //   component: Signup,
  // },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!token) {
      return next("/login");
    }
  }

  next();
});

export default router;
