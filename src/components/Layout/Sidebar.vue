<template>
  <aside
    :class="[
      'sidebar relative bg-white border-r flex flex-col transition-all duration-300',
      collapsed ? 'w-16' : 'w-64',
    ]"
  >
    <!-- COLLAPSE BUTTON (inside sidebar, right edge) -->
    <button
      @click="$emit('toggleSidebar')"
      class="sidebar-collapse-btn"
      :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
    >
      <ChevronLeft v-if="!collapsed" size="16" />
      <ChevronRight v-else size="16" />
    </button>

    <!-- LOGO -->

    <!-- <div class="h-14 flex items-center px-4 border-b shrink-0">
      <span v-if="!collapsed" class="text-lg font-semibold"> Ask IT </span>

      <span v-else class="font-bold text-center w-full"> IT </span>
    </div> -->

    <!-- MENU -->

    <nav class="flex-1 pt-4 space-y-1">
      <router-link
        v-if="isAdmin"
        to="/dashboard"
        class="menu-item"
      >
        <Home size="18" />

        <span v-if="!collapsed"> Dashboard </span>
      </router-link>

      <router-link to="/raise-ticket" class="menu-item">
        <Ticket size="18" />

        <span v-if="!collapsed"> Raise Ticket </span>
      </router-link>

      <router-link to="/my-tickets" class="menu-item">
        <FileText size="18" />

        <span v-if="!collapsed"> My Tickets </span>
      </router-link>
    </nav>

    <!-- USER CARD -->

    <div
      v-if="!collapsed"
      class="mx-4 mb-3 p-3 bg-gray-50 rounded-lg border text-sm"
    >
      <div class="text-gray-500">Role</div>

      <div class="font-semibold">{{ userRole }}</div>
    </div>

    <!-- LOGOUT -->

    <div class="p-4">
      <button
        class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
        @click="handleLogout"
      >
        <LogOut size="16" class="inline" />

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
