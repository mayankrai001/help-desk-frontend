<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-800">
          Dashboard Overview
        </h1>
        <p class="text-slate-500 mt-1">
          Here's what's happening with your tickets today.
        </p>
      </div>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Tickets -->
      <div
        class="relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
      >
        <div
          class="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 opacity-60"
        ></div>
        <div class="flex justify-between items-start mb-4">
          <div>
            <p
              class="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider"
            >
              Total Tickets
            </p>
            <h3 class="text-4xl font-bold text-slate-800">
              {{ totalTickets }}
            </h3>
          </div>
          <div class="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Open Tickets -->
      <div
        class="relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
      >
        <div
          class="absolute right-0 top-0 w-24 h-24 bg-yellow-50 rounded-bl-full -z-10 opacity-60"
        ></div>
        <div class="flex justify-between items-start mb-4">
          <div>
            <p
              class="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider"
            >
              Open Tickets
            </p>
            <h3 class="text-4xl font-bold text-yellow-600">
              {{ openTickets }}
            </h3>
          </div>
          <div class="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Completed Tickets -->
      <div
        class="relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
      >
        <div
          class="absolute right-0 top-0 w-24 h-24 bg-green-50 rounded-bl-full -z-10 opacity-60"
        ></div>
        <div class="flex justify-between items-start mb-4">
          <div>
            <p
              class="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider"
            >
              Completed Tickets
            </p>
            <h3 class="text-4xl font-bold text-emerald-600">
              {{ completedTickets }}
            </h3>
          </div>
          <div class="p-3 bg-green-50 text-emerald-600 rounded-xl">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Tickets Section -->
    <div
      class="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
    >
      <div
        class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50"
      >
        <h2 class="text-xl font-bold text-slate-800">Recent Tickets</h2>
      </div>

      <!-- Recent Tickets Table Component -->
      <div class="p-6">
        <AdminTickets :tickets="tickets" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AdminTickets from "./dashboard/AdminTickets.vue";

export default {
  name: "DashboardView",

  components: {
    AdminTickets,
  },

  computed: {
    ...mapGetters("ticket", [
      "tickets",
      "totalTickets",
      "openTickets",
      "completedTickets",
    ]),
  },

  mounted() {
    this.fetchAdminTickets();
  },

  methods: {
    ...mapActions("ticket", ["fetchAdminTickets"]),
  },
};
</script>
