<template>
  <header class="h-20 min-h-[5rem] bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm flex items-center justify-between px-6 sticky top-0 z-40 transition-all duration-300">
    <!-- LOGO -->
    <router-link :to="homeRoute" class="flex items-center gap-3 px-3 py-2 -ml-2 rounded-xl hover:bg-slate-100/50 transition-colors duration-200">
      <div class="flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/60 rounded-xl p-2 shadow-[0_2px_8px_rgba(59,130,246,0.15)]">
        <img src="@/assets/logo.png" alt="Ask IT" class="h-9 w-auto object-contain drop-shadow-sm" />
      </div>
      <span class="font-bold text-[1.35rem] text-slate-800 tracking-tight">Ask IT</span>
    </router-link>

    <!-- RIGHT -->
    <div class="flex items-center gap-4">
      <button class="flex items-center justify-center w-10 h-10 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors" title="Notifications">
        <Bell size="20" class="drop-shadow-sm" />
      </button>

      <div class="flex items-center gap-3 py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 text-white flex items-center justify-center text-sm font-semibold shadow-[0_2px_6px_rgba(59,130,246,0.35)]">
          {{ userInitial }}
        </div>

        <div class="flex flex-col leading-snug">
          <span class="text-sm font-semibold text-slate-800">
            {{ currentUser?.name || "User" }}
          </span>
          <span v-if="currentUser?.companyName" class="text-xs text-slate-500 font-medium">
            {{ currentUser.companyName }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { Bell } from "lucide-vue-next";
import { mapGetters } from "vuex";

export default {
  name: "NavbarLayout",

  components: {
    Bell,
  },

  computed: {
    ...mapGetters("auth", ["currentUser"]),

    homeRoute() {
      const role = this.currentUser?.role?.toLowerCase();
      return role === "admin" ? "/dashboard" : "/my-tickets";
    },

    userInitial() {
      const user = this.currentUser;
      if (!user) return "?";
      if (user.name && user.name.trim()) {
        return user.name.trim().charAt(0).toUpperCase();
      }
      if (user.email) {
        return user.email.charAt(0).toUpperCase();
      }
      return "?";
    },
  },
};
</script>
