<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-slate-800">My Tickets</h2>
        <p class="text-slate-500 mt-1">Manage and track your submitted support requests.</p>
      </div>
      
      <!-- Optional: Add New Ticket Button on the right -->
      <router-link to="/raise-ticket" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-blue-600/20 active:scale-95">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        New Ticket
      </router-link>
    </div>

    <!-- Table Container -->
    <div class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left whitespace-nowrap">
          <thead class="text-xs text-slate-500 bg-slate-50/80 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th scope="col" class="px-6 py-4 tracking-wider">Ticket ID</th>
              <th scope="col" class="px-6 py-4 tracking-wider">Category</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Priority</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-center">Status</th>
              <th scope="col" class="px-6 py-4 tracking-wider text-right">Created</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 bg-white">
            <tr
              v-for="ticket in tickets"
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

              <td class="px-6 py-4 text-right text-slate-500 font-medium">
                {{ formatDate(ticket.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="!tickets || tickets.length === 0" class="py-16 flex flex-col items-center justify-center text-center">
        <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
        </div>
        <h3 class="text-lg font-semibold text-slate-800 mb-1">No tickets found</h3>
        <p class="text-slate-500 text-sm max-w-sm">You haven't submitted any support tickets yet. Click 'New Ticket' to get started.</p>
      </div>
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

    formatDate(date) {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
};
</script>
