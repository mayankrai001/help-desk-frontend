<template>
  <div
    :class="[
      'bg-gray-100 text-gray-800 h-screen flex flex-col transition-all duration-300 border-r',
      collapsed ? 'w-16' : 'w-60',
    ]"
  >
    <!-- Logo -->
    <div
      class="h-16 flex items-center justify-between px-4 border-b border-slate-600"
    >
      <button
        @click="$emit('toggleSidebar')"
        class="text-white hover:text-gray-200"
      >
        ☰
      </button>

      <span v-if="!collapsed" class="font-bold text-lg"> HelpDesk </span>

      <span v-else class="font-bold text-lg"> HD </span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 pt-4 space-y-2">
      <router-link
        to="/dashboard"
        class="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded-md transition"
      >
        <span class="text-lg">📊</span>

        <span v-if="!collapsed">Dashboard</span>
      </router-link>

      <router-link
        to="/raise-ticket"
        class="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded-md transition"
      >
        <span class="text-lg">🎫</span>

        <span v-if="!collapsed">Raise Ticket</span>
      </router-link>

      <router-link
        to="/my-tickets"
        class="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 rounded-md transition"
      >
        <span class="text-lg">📋</span>

        <span v-if="!collapsed">My Tickets</span>
      </router-link>
    </nav>

    <!-- Logout -->
    <div class="p-4">
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 w-full py-2 rounded text-sm"
      >
        <span v-if="!collapsed">Logout</span>
        <span v-else>⎋</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SidebarLayout",
  props: ["collapsed"],

  methods: {
    ...mapActions("auth", ["logout"]),
  },
};
</script>
