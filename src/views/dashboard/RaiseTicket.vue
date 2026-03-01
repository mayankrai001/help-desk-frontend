<template>
  <div class="max-w-xl bg-white p-6 shadow rounded">
    <h2 class="text-xl font-bold mb-4">Raise Ticket</h2>

    <select v-model="category" class="border w-full p-2 mb-4">
      <option value="">Select Category</option>

      <option v-for="cat in categories" :key="cat._id" :value="cat.name">
        {{ cat.name }}
      </option>
    </select>

    <select v-model="priority" class="border w-full p-2 mb-4">
      <option value="">Priority</option>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
      <option>Critical</option>
    </select>

    <textarea
      v-model="description"
      placeholder="Describe your issue"
      class="border w-full p-2 mb-4"
    />

    <button
      @click="submitTicket"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Submit Ticket
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      category: "",
      priority: "",
      description: "",
    };
  },

  computed: {
    ...mapGetters("categories", ["categories"]),
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {
    ...mapActions("ticket", ["createTicket"]),
    ...mapActions("categories", ["fetchCategories"]),

    async submitTicket() {
      const payload = {
        category: this.category,
        priority: this.priority,
        description: this.description,
      };
      console.log("Submitting Ticket with Payload:", payload); // Debug log to check payload before API call
      let res = await this.createTicket(payload);

      console.log("Ticket Creation Response:", res); // Debug log to check response

      this.$router.push("/my-tickets");
    },
  },
};
</script>
