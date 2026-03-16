<template>
  <aside
    :class="[
      'relative bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)]',
      collapsed ? 'w-20' : 'w-72',
    ]"
  >
    <!-- COLLAPSE BUTTON -->
    <button
      @click="$emit('toggleSidebar')"
      class="absolute right-[-14px] top-8 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-800 hover:shadow-md hover:bg-slate-50 transition-all z-10"
      :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
    >
      <ChevronLeft v-if="!collapsed" size="16" class="ml-0.5" />
      <ChevronRight v-else size="16" class="ml-0.5" />
    </button>

    <!-- MENU -->
    <nav class="flex-1 pt-6 px-3 space-y-2 overflow-y-auto">
      <router-link
        v-if="isAdmin"
        to="/dashboard"
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all group [&.router-link-active]:bg-blue-50 [&.router-link-active]:text-blue-700 [&.router-link-active]:font-semibold"
      >
        <Home size="20" class="group-[.router-link-active]:text-blue-600 transition-colors" />
        <span v-if="!collapsed" class="text-sm"> Dashboard </span>
      </router-link>

      <router-link 
        to="/raise-ticket" 
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all group [&.router-link-active]:bg-blue-50 [&.router-link-active]:text-blue-700 [&.router-link-active]:font-semibold"
      >
        <Ticket size="20" class="group-[.router-link-active]:text-blue-600 transition-colors" />
        <span v-if="!collapsed" class="text-sm"> Raise Ticket </span>
      </router-link>

      <router-link 
        to="/my-tickets" 
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all group [&.router-link-active]:bg-blue-50 [&.router-link-active]:text-blue-700 [&.router-link-active]:font-semibold"
      >
        <FileText size="20" class="group-[.router-link-active]:text-blue-600 transition-colors" />
        <span v-if="!collapsed" class="text-sm"> My Tickets </span>
      </router-link>
    </nav>

    <!-- BOTTOM SECTION -->
    <div class="p-4 mt-auto border-t border-slate-100">
      <!-- USER CARD -->
      <div
        v-if="!collapsed"
        class="mb-4 p-4 bg-slate-50/80 rounded-xl border border-slate-200/60"
      >
        <div class="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Your Role</div>
        <div class="font-bold text-slate-800 text-sm flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          {{ userRole }}
        </div>
      </div>

      <!-- LOGOUT -->
      <button
        class="w-full flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 py-2.5 rounded-xl transition-all font-medium text-sm"
        @click="handleLogout"
      >
        <LogOut size="18" />
        <span v-if="!collapsed"> Logout </span>
      </button>
    </div>
  </aside>
</template>

<script>
import {
  Home,
  Ticket,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SidebarLayout",

  props: ["collapsed"],

  emits: ["toggleSidebar"],

  computed: {
    ...mapGetters("auth", ["currentUser"]),

    isAdmin() {
      const role = this.currentUser?.role;
      return role ? String(role).toLowerCase() === "admin" : false;
    },

    userRole() {
      const role = this.currentUser?.role;
      return role ? String(role).charAt(0).toUpperCase() + String(role).slice(1).toLowerCase() : "User";
    },
  },

  components: {
    Home,
    Ticket,
    FileText,
    LogOut,
    ChevronLeft,
    ChevronRight,
  },

  methods: {
    ...mapActions("auth", ["logout"]),

    async handleLogout() {
      try {
        await this.logout();
        window.location.href = "/login";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
