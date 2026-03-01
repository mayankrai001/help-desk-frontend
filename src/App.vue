<template>
  <div class="flex">
    <Sidebar :collapsed="collapsed" @toggleSidebar="toggleSidebar" />

    <div class="flex-1 flex flex-col">
      <Navbar @toggleSidebar="toggleSidebar" />

      <div class="p-6 bg-gray-100 min-h-screen">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Layout/Sidebar.vue";
import Navbar from "@/components/Layout/Navbar.vue";

export default {
  components: {
    Sidebar,
    Navbar,
  },

  data() {
    return {
      collapsed: false,
    };
  },

  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
