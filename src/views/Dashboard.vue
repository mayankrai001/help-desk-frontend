<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-6 mb-8">
      <!-- Total -->
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <p class="text-gray-500 text-sm">Total Tickets</p>

        <p class="text-3xl font-bold mt-2">
          {{ totalTickets }}
        </p>
      </div>

      <!-- Open -->
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <p class="text-gray-500 text-sm">Open Tickets</p>

        <p class="text-3xl font-bold text-yellow-500 mt-2">
          {{ openTickets }}
        </p>
      </div>

      <!-- Completed -->
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <p class="text-gray-500 text-sm">Completed Tickets</p>

        <p class="text-3xl font-bold text-green-600 mt-2">
          {{ completedTickets }}
        </p>
      </div>
    </div>

    <h2 class="text-lg font-semibold mb-3">Recent Tickets</h2>

    <!-- Recent Tickets Table -->
    <AdminTickets :tickets="tickets" />
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
