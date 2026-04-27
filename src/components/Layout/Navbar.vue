<template>
  <header class="h-20 min-h-[5rem] bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex items-center justify-between px-6 sticky top-0 z-40 transition-all duration-300">
    <!-- LOGO -->
    <router-link :to="homeRoute" class="flex items-center gap-3 px-3 py-2 -ml-2 rounded-xl hover:bg-slate-100/50 transition-colors duration-200 group">
      <div class="flex items-center justify-center w-[52px] h-[52px] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/60 rounded-2xl p-2 shadow-[0_2px_12px_rgba(59,130,246,0.12)] group-hover:shadow-[0_4px_16px_rgba(59,130,246,0.2)] transition-shadow duration-300">
        <img src="@/assets/logo.png" alt="Ask IT" class="h-9 w-auto object-contain drop-shadow-sm transition-transform group-hover:scale-105 duration-300" />
      </div>
      <span class="font-bold text-[1.4rem] text-slate-800 tracking-tight">Ask IT</span>
    </router-link>

    <!-- RIGHT -->
    <div class="flex items-center gap-5">

      <div class="flex items-center gap-3 py-1.5 px-3 rounded-2xl hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-sm cursor-pointer transition-all duration-300">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-[0_2px_10px_rgba(59,130,246,0.4)]">
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
        <ChevronDown size="16" class="text-slate-400 ml-1" />
      </div>
    </div>
  </header>
</template>

<script>
import { ChevronDown } from "lucide-vue-next";
import { mapGetters } from "vuex";

export default {
  name: "NavbarLayout",

  components: {
    ChevronDown,
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
