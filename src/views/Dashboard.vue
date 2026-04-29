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
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Total Tickets -->
      <div
        class="group relative overflow-hidden bg-white p-7 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:-translate-y-1 transition-all duration-300"
      >
        <div
          class="absolute right-[-10%] top-[-10%] w-32 h-32 bg-blue-400/20 rounded-full blur-2xl group-hover:bg-blue-400/30 transition-colors duration-300 pointer-events-none"
        ></div>
        <div class="flex justify-between items-start mb-6">
          <div>
            <p
              class="text-slate-400 text-xs font-bold mb-1.5 uppercase tracking-widest"
            >
              Total Tickets
            </p>
            <h3 class="text-4xl font-extrabold text-slate-800 tracking-tight">
              {{ totalTickets }}
            </h3>
          </div>
          <div
            class="p-3.5 bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600 rounded-2xl shadow-[0_4px_12px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform duration-300"
          >
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
        class="group relative overflow-hidden bg-white p-7 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] hover:-translate-y-1 transition-all duration-300"
      >
        <div
          class="absolute right-[-10%] top-[-10%] w-32 h-32 bg-amber-400/20 rounded-full blur-2xl group-hover:bg-amber-400/30 transition-colors duration-300 pointer-events-none"
        ></div>
        <div class="flex justify-between items-start mb-6">
          <div>
            <p
              class="text-slate-400 text-xs font-bold mb-1.5 uppercase tracking-widest"
            >
              Open Tickets
            </p>
            <h3 class="text-4xl font-extrabold text-amber-500 tracking-tight">
              {{ openTickets }}
            </h3>
          </div>
          <div
            class="p-3.5 bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-500 rounded-2xl shadow-[0_4px_12px_rgba(245,158,11,0.15)] group-hover:scale-110 transition-transform duration-300"
          >
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

      <!-- Pending Requests -->
      <div
        class="group relative overflow-hidden bg-white p-7 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(148,163,184,0.1)] hover:-translate-y-1 transition-all duration-300"
      >
        <div
          class="absolute right-[-10%] top-[-10%] w-32 h-32 bg-slate-400/20 rounded-full blur-2xl group-hover:bg-slate-400/30 transition-colors duration-300 pointer-events-none"
        ></div>
        <div class="flex justify-between items-start mb-6">
          <div>
            <p
              class="text-slate-400 text-xs font-bold mb-1.5 uppercase tracking-widest"
            >
              Pending Requests
            </p>
            <h3 class="text-4xl font-extrabold text-slate-500 tracking-tight">
              {{ pendingTickets }}
            </h3>
          </div>
          <div
            class="p-3.5 bg-gradient-to-br from-slate-50 to-slate-100/50 text-slate-500 rounded-2xl shadow-[0_4px_12px_rgba(148,163,184,0.15)] group-hover:scale-110 transition-transform duration-300"
          >
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
        class="group relative overflow-hidden bg-white p-7 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300"
      >
        <div
          class="absolute right-[-10%] top-[-10%] w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl group-hover:bg-emerald-400/30 transition-colors duration-300 pointer-events-none"
        ></div>
        <div class="flex justify-between items-start mb-6">
          <div>
            <p
              class="text-slate-400 text-xs font-bold mb-1.5 uppercase tracking-widest"
            >
              Completed Tickets
            </p>
            <h3 class="text-4xl font-extrabold text-emerald-500 tracking-tight">
              {{ completedTickets }}
            </h3>
          </div>
          <div
            class="p-3.5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-emerald-500 rounded-2xl shadow-[0_4px_12px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform duration-300"
          >
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
      class="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
    >
      <div
        class="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50"
      >
        <h2 class="text-xl font-bold text-slate-800 tracking-tight">
          Recent Tickets
        </h2>
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
      "pendingTickets",
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
