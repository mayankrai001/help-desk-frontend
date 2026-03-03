<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl shadow-lg w-[500px] p-6">
      <h3 class="text-lg font-semibold mb-4">Ticket Details</h3>

      <div class="space-y-3 text-sm">
        <p>
          <span class="font-semibold">Ticket ID:</span>
          {{ ticket.ticketId }}
        </p>

        <p>
          <span class="font-semibold">Category:</span>
          {{ ticket.category }}
        </p>

        <p>
          <span class="font-semibold">Priority:</span>
          {{ ticket.priority }}
        </p>

        <p>
          <span class="font-semibold">Status:</span>
          {{ ticket.status }}
        </p>

        <p>
          <span class="font-semibold">Description:</span>
          {{ ticket.description }}
        </p>

        <p>
          <span class="font-semibold">Created:</span>
          {{ new Date(ticket.createdAt).toLocaleString() }}
        </p>
      </div>

      <div class="flex justify-end mt-6">
        <button
          @click="$emit('close')"
          class="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    ticket: Object,
  },
  mounted() {
    console.log("Ticket Modal Mounted with ticket:", this.ticket);
  },
};
</script>
