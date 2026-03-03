<template>
  <div>
    <!-- Filters -->
    <div class="flex gap-4 mb-4">
      <input
        v-model="search"
        placeholder="Search Ticket ID"
        class="border rounded px-3 py-2 w-60"
      />

      <select v-model="statusFilter" class="border rounded px-3 py-2">
        <option value="">All Status</option>
        <option>Received</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <select v-model="priorityFilter" class="border rounded px-3 py-2">
        <option value="">All Priority</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left">Ticket ID</th>
            <th class="px-6 py-3 text-left">Category</th>
            <th class="px-6 py-3 text-left">Priority</th>
            <th class="px-6 py-3 text-left">Status</th>
            <th class="px-6 py-3 text-left">Update</th>
            <th class="px-6 py-3 text-left">View</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="ticket in paginatedTickets"
            :key="ticket._id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-6 py-4">{{ ticket.ticketId }}</td>

            <td class="px-6 py-4">{{ ticket.category }}</td>

            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs rounded bg-gray-500 text-white">
                {{ ticket.priority }}
              </span>
            </td>

            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs rounded bg-blue-500 text-white">
                {{ ticket.status }}
              </span>
            </td>

            <td class="px-6 py-4">
              <select
                @change="updateStatus(ticket, $event)"
                class="border rounded px-2 py-1"
              >
                <option disabled selected>Change</option>
                <option>Received</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </td>
            <td class="px-6 py-4">
              <button
                @click="openTicket(ticket)"
                title="View Ticket"
                class="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition"
              >
                <i class="fas fa-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end gap-2 mt-4" v-if="totalPages > 1">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="border px-3 py-1 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <button
        @click="nextPage"
        :disabled="page >= totalPages"
        class="border px-3 py-1 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>

    <!-- Modal -->
    <ticketModal
      :show="showModal"
      :ticket="selectedTicket"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ticketModal from "@/components/common/ticketModal.vue";

export default {
  props: ["tickets"],

  components: {
    ticketModal,
  },

  data() {
    return {
      search: "",
      statusFilter: "",
      priorityFilter: "",
      page: 1,
      perPage: 5,

      showModal: false,
      selectedTicket: {},
    };
  },

  computed: {
    filteredTickets() {
      return this.tickets.filter((ticket) => {
        const matchSearch = ticket.ticketId
          .toLowerCase()
          .includes(this.search.toLowerCase());

        const matchStatus =
          !this.statusFilter || ticket.status === this.statusFilter;

        const matchPriority =
          !this.priorityFilter || ticket.priority === this.priorityFilter;

        return matchSearch && matchStatus && matchPriority;
      });
    },

    totalPages() {
      return Math.ceil(this.filteredTickets.length / this.perPage);
    },

    paginatedTickets() {
      const start = (this.page - 1) * this.perPage;

      return this.filteredTickets.slice(start, start + this.perPage);
    },
  },

  methods: {
    ...mapActions("ticket", ["updateTicketStatus"]),

    updateStatus(ticket, event) {
      this.updateTicketStatus({
        ticketId: ticket._id,
        status: event.target.value,
      });
    },

    nextPage() {
      console.log("Next page");
      if (this.page < this.totalPages) {
        this.page++;
      }
    },

    prevPage() {
      console.log("Previous page");
      if (this.page > 1) {
        this.page--;
      }
    },

    openTicket(ticket) {
      this.selectedTicket = ticket;
      this.showModal = true;
    },
  },
};
</script>
