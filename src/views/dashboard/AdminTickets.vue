<template>
  <div class="space-y-6">
    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="relative group flex-1">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input
          v-model="search"
          placeholder="Search by Ticket ID..."
          class="bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 p-2.5 transition-all outline-none shadow-sm"
        />
      </div>

      <div class="flex gap-4 sm:w-auto w-full">
        <select v-model="statusFilter" class="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full sm:w-40 p-2.5 transition-all outline-none shadow-sm font-medium">
          <option value="">All Statuses</option>
          <option>Received</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select v-model="priorityFilter" class="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full sm:w-40 p-2.5 transition-all outline-none shadow-sm font-medium">
          <option value="">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left whitespace-nowrap">
          <thead class="text-xs text-slate-500 bg-slate-50/80 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th scope="col" class="px-6 py-4 tracking-wider">Ticket ID</th>
              <th scope="col" class="px-6 py-4 tracking-wider">Category</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Priority</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Status</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Update</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Action</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 bg-white">
            <tr
              v-for="ticket in paginatedTickets"
              :key="ticket._id"
              class="hover:bg-blue-50/40 transition-colors group"
            >
              <td class="px-6 py-4 border-l-2 border-transparent group-hover:border-blue-500">
                <span class="font-mono font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md text-xs">{{ ticket.ticketId }}</span>
              </td>

              <td class="px-6 py-4">
                <span class="font-medium text-slate-800">{{ ticket.category }}</span>
              </td>

              <td class="px-6 py-4 text-center">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border"
                  :class="priorityClass(ticket.priority)"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="priorityDotClass(ticket.priority)"></span>
                  {{ ticket.priority }}
                </span>
              </td>

              <td class="px-6 py-4 text-center">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border"
                  :class="statusClass(ticket.status)"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(ticket.status)"></span>
                  {{ ticket.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-center">
                <select
                  @change="updateStatus(ticket, $event)"
                  :value="ticket.status"
                  class="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 p-1.5 transition-all outline-none font-medium text-center hover:bg-white cursor-pointer"
                >
                  <option disabled value="">Change</option>
                  <option value="Received">Received</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              
              <td class="px-6 py-4 text-center">
                <button
                  @click="openTicket(ticket)"
                  title="View Details"
                  class="p-2 rounded-xl bg-slate-50 text-slate-500 border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm flex inline-flex items-center justify-center transform active:scale-95 mx-auto"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="!paginatedTickets || paginatedTickets.length === 0" class="py-12 flex flex-col items-center justify-center text-center">
        <div class="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-3">
          <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <h3 class="text-sm font-semibold text-slate-800">No tickets found</h3>
        <p class="text-slate-500 text-xs mt-1">Try adjusting your search or filters.</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100" v-if="totalPages > 1">
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-slate-700">
            Showing page <span class="font-semibold text-slate-900">{{ page }}</span> of <span class="font-semibold text-slate-900">{{ totalPages }}</span>
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              @click="prevPage"
              :disabled="page === 1"
              class="relative inline-flex items-center px-4 py-2 rounded-l-xl border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="page >= totalPages"
              class="relative inline-flex items-center px-4 py-2 rounded-r-xl border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
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
      return Math.ceil(this.filteredTickets.length / this.perPage) || 1;
    },

    paginatedTickets() {
      const start = (this.page - 1) * this.perPage;
      return this.filteredTickets.slice(start, start + this.perPage);
    },
  },

  methods: {
    ...mapActions("ticket", ["updateTicketStatus"]),

    updateStatus(ticket, event) {
      if (!event.target.value) return;
      this.updateTicketStatus({
        ticketId: ticket._id,
        status: event.target.value,
      });
    },
    
    priorityClass(priority) {
      if (priority === "High" || priority === "Critical") return "bg-red-50 text-red-700 border-red-200";
      if (priority === "Medium") return "bg-amber-50 text-amber-700 border-amber-200";
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    },
    
    priorityDotClass(priority) {
      if (priority === "High" || priority === "Critical") return "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]";
      if (priority === "Medium") return "bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.5)]";
      return "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]";
    },

    statusClass(status) {
      if (status === "Received") return "bg-slate-50 text-slate-700 border-slate-200";
      if (status === "In Progress") return "bg-blue-50 text-blue-700 border-blue-200";
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    },
    
    statusDotClass(status) {
      if (status === "Received") return "bg-slate-500 shadow-[0_0_4px_rgba(100,116,139,0.5)]";
      if (status === "In Progress") return "bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]";
      return "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]";
    },

    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
      }
    },

    prevPage() {
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
