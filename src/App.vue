<template>
  <div class="h-screen flex flex-col bg-gray-100">
    <template v-if="!isAuthPage">
      <Navbar />

      <div class="flex flex-1 overflow-hidden">
        <Sidebar :collapsed="collapsed" @toggleSidebar="toggleSidebar" />

        <main class="flex-1 overflow-y-auto p-6">
          <router-view />
        </main>
      </div>
    </template>

    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import Navbar from "@/components/Layout/Navbar.vue";
import Sidebar from "@/components/Layout/Sidebar.vue";

export default {
  components: { Navbar, Sidebar },

  data() {
    return {
      collapsed: false,
    };
  },

  computed: {
    isAuthPage() {
      return ["/login", "/signup"].includes(this.$route.path);
    },
  },

  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
