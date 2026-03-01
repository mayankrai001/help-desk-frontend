<template>
  <div class="flex justify-center pt-10">
    <div class="w-full max-w-xl bg-white p-8 rounded-xl shadow-sm border">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Raise Ticket</h2>

      <!-- Category -->
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-600 mb-2">
          Category
        </label>

        <select
          v-model="category"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">Select Category</option>

          <option v-for="cat in categories" :key="cat._id" :value="cat.name">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- Priority -->
      <div class="mb-5">
        <label class="block text-sm font-medium text-gray-600 mb-2">
          Priority
        </label>

        <select
          v-model="priority"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">Select Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      <!-- Description -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-600 mb-2">
          Issue Description
        </label>

        <textarea
          v-model="description"
          rows="4"
          placeholder="Describe your issue..."
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        ></textarea>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="mb-4 p-3 bg-green-100 text-green-700 rounded-lg transition"
      >
        ✓ {{ successMessage }}
      </div>

      <button
        @click="submitTicket"
        :disabled="!category || !priority || !description || loading"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <span v-if="loading">Submitting...</span>
        <span v-else>Submit Ticket</span>
      </button>
    </div>
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
      successMessage: "",
      loading: false,
    };
  },

  computed: {
    ...mapGetters("categories", ["categories"]),
    ...mapGetters("auth", ["currentUser"]),
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {
    ...mapActions("ticket", ["createTicket"]),
    ...mapActions("categories", ["fetchCategories"]),

    async submitTicket() {
      this.loading = true;
      const payload = {
        category: this.category,
        priority: this.priority,
        description: this.description,
        userEmail: this.currentUser?.email || "",
      };
      await this.createTicket(payload);
      this.loading = false;
      this.successMessage = "Ticket created successfully";

      // reset form
      this.category = "";
      this.priority = "";
      this.description = "";

      this.$router.push("/my-tickets");
    },
  },
};
</script>
