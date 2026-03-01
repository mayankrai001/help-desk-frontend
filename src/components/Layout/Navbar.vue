<template>
  <header class="navbar-header">
    <!-- LOGO -->
    <router-link :to="homeRoute" class="logo-wrapper">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="Ask IT" class="logo-img" />
      </div>
      <span class="logo-text">Ask IT</span>
    </router-link>

    <!-- CENTER SEARCH -->

    <!-- <div class="w-96">
      <div class="relative">
        <Search class="absolute left-3 top-2.5 text-gray-400" size="16" />

        <input
          placeholder="Search tickets..."
          class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div> -->

    <!-- RIGHT -->

    <div class="navbar-right">
      <button class="navbar-icon-btn" title="Notifications">
        <Bell size="20" />
      </button>

      <div class="navbar-user">
        <div class="navbar-avatar">
          {{ userInitial }}
        </div>

        <div class="navbar-user-info">
          <span class="navbar-user-name">
            {{ currentUser?.name || "User" }}
          </span>
          <span v-if="currentUser?.companyName" class="navbar-user-company">
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
