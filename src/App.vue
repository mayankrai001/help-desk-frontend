<template>
  <div class="h-screen flex flex-col bg-slate-50 relative overflow-hidden font-sans">
    <!-- Premium Mesh Gradient Background -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none"></div>

    <template v-if="!isAuthPage">
      <Navbar />

      <div class="flex flex-1 overflow-hidden z-10">
        <Sidebar :collapsed="collapsed" @toggleSidebar="toggleSidebar" />

        <main class="flex-1 overflow-y-auto p-6 lg:p-8">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </div>
    </template>

    <template v-else>
      <div class="z-10 w-full h-full">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
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

<style>
/* Global Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
