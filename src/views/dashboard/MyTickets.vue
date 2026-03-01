<template>
  <div class="max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">My Tickets</h2>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full table-fixed text-sm">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="w-1/5 px-6 py-3 text-left font-semibold">Ticket ID</th>

            <th class="w-2/5 px-6 py-3 text-left font-semibold">Category</th>

            <th class="w-1/5 px-6 py-3 text-center font-semibold">Priority</th>

            <th class="w-1/5 px-6 py-3 text-center font-semibold">Status</th>

            <th class="w-1/5 px-6 py-3 text-center font-semibold">Created</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="ticket in tickets"
            :key="ticket._id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="px-6 py-4 text-left font-medium text-gray-700">
              {{ ticket.ticketId }}
            </td>

            <td class="px-6 py-4 text-left text-gray-600">
              {{ ticket.category }}
            </td>

            <td class="px-6 py-4 text-center">
              <span
                class="px-3 py-1 text-xs font-semibold rounded-full text-white"
                :class="priorityClass(ticket.priority)"
              >
                {{ ticket.priority }}
              </span>
            </td>

            <td class="px-6 py-4 text-center">
              <span
                class="px-3 py-1 text-xs font-semibold rounded-full text-white"
                :class="statusClass(ticket.status)"
              >
                {{ ticket.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-center text-gray-500">
              {{ formatDate(ticket.createdAt) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MyTicketsView",

  computed: {
    ...mapGetters("ticket", ["tickets"]),
  },

  mounted() {
    this.fetchMyTickets();
  },

  methods: {
    ...mapActions("ticket", ["fetchMyTickets"]),

    priorityClass(priority) {
      if (priority === "High") return "bg-red-500";
      if (priority === "Medium") return "bg-yellow-500";

      return "bg-green-500";
    },

    statusClass(status) {
      if (status === "Received") return "bg-gray-500";
      if (status === "In Progress") return "bg-blue-500";

      return "bg-green-500";
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
