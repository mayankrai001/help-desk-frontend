<template>
  <aside
    :class="[
      'relative bg-white/60 backdrop-blur-xl border-r border-slate-200/50 flex flex-col transition-all duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30',
      collapsed ? 'w-20' : 'w-72',
    ]"
  >
    <!-- COLLAPSE BUTTON -->
    <button
      @click="$emit('toggleSidebar')"
      class="absolute right-[-14px] top-8 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-md hover:bg-slate-50 transition-all duration-300 z-50"
      :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
    >
      <ChevronLeft v-if="!collapsed" size="16" class="ml-0.5" />
      <ChevronRight v-else size="16" class="ml-0.5" />
    </button>

    <!-- MENU -->
    <nav class="flex-1 pt-6 px-4 space-y-2.5 overflow-y-auto">
      <router-link
        v-if="isAdmin"
        to="/dashboard"
        class="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 group [&.router-link-active]:bg-gradient-to-r [&.router-link-active]:from-blue-50/80 [&.router-link-active]:to-indigo-50/80 [&.router-link-active]:text-blue-700 [&.router-link-active]:font-semibold [&.router-link-active]:shadow-[inset_4px_0_0_rgba(37,99,235,1)]"
      >
        <Home size="20" class="group-hover:scale-110 group-[.router-link-active]:text-blue-600 transition-all duration-300" />
        <span v-if="!collapsed" class="text-sm"> Dashboard </span>
      </router-link>

      <router-link
        v-if="isAdmin"
        to="/manage-admins"
        class="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 group [&.router-link-active]:bg-gradient-to-r [&.router-link-active]:from-blue-50/80 [&.router-link-active]:to-indigo-50/80 [&.router-link-active]:text-blue-700 [&.router-link-active]:font-semibold [&.router-link-active]:shadow-[inset_4px_0_0_rgba(37,99,235,1)]"
      >
        <Users size="20" class="group-hover:scale-110 group-[.router-link-active]:text-blue-600 transition-all duration-300" />
        <span v-if="!collapsed" class="text-sm"> Manage Admins </span>
      </router-link>

      <router-link 
        to="/raise-ticket" 
        class="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 group [&.router-link-active]:bg-gradient-to-r [&.router-link-active]:from-blue-50/80 [&.router-link-active]:to-indigo-50/80 [&.router-link-active]:text-blue-700 [&.router-link-active]:font-semibold [&.router-link-active]:shadow-[inset_4px_0_0_rgba(37,99,235,1)]"
      >
        <Ticket size="20" class="group-hover:scale-110 group-[.router-link-active]:text-blue-600 transition-all duration-300" />
        <span v-if="!collapsed" class="text-sm"> Raise Ticket </span>
      </router-link>

      <router-link 
        to="/my-tickets" 
        class="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 group [&.router-link-active]:bg-gradient-to-r [&.router-link-active]:from-blue-50/80 [&.router-link-active]:to-indigo-50/80 [&.router-link-active]:text-blue-700 [&.router-link-active]:font-semibold [&.router-link-active]:shadow-[inset_4px_0_0_rgba(37,99,235,1)]"
      >
        <FileText size="20" class="group-hover:scale-110 group-[.router-link-active]:text-blue-600 transition-all duration-300" />
        <span v-if="!collapsed" class="text-sm"> My Tickets </span>
      </router-link>
    </nav>

    <!-- BOTTOM SECTION -->
    <div class="p-5 mt-auto border-t border-slate-200/50">
      <!-- USER CARD -->
      <div
        v-if="!collapsed"
        class="mb-4 p-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 shadow-sm"
      >
        <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Your Role</div>
        <div class="font-bold text-slate-800 text-sm flex items-center gap-2.5">
          <div class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          {{ userRole }}
        </div>
      </div>

      <!-- LOGOUT -->
      <button
        class="w-full flex items-center justify-center gap-2.5 bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 py-3 rounded-2xl transition-all duration-300 font-semibold text-sm group"
        @click="handleLogout"
      >
        <LogOut size="18" class="group-hover:-translate-x-1 transition-transform" />
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
  Users,
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
    Users,
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
