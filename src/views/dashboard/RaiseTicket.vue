<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <div class="mb-8">
      <h2 class="text-3xl font-bold tracking-tight text-slate-800">Raise Ticket</h2>
      <p class="text-slate-500 mt-1">Submit a new support request and we'll help you resolve it.</p>
    </div>

    <div class="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
      <!-- Decorative background accent -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-60"></div>

      <!-- Category -->
      <div class="mb-5">
        <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
          Category
        </label>
        
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <select
            v-model="category"
            class="bg-slate-50/50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 p-3.5 transition-all outline-none appearance-none"
          >
            <option value="" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat._id" :value="cat.name">
              {{ cat.name }}
            </option>
          </select>
          <!-- Custom Dropdown Arrow -->
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <!-- Priority -->
      <div class="mb-5">
        <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
          Priority
        </label>
        
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
          </div>
          <select
            v-model="priority"
            class="bg-slate-50/50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 p-3.5 transition-all outline-none appearance-none"
          >
            <option value="" disabled>Select Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <!-- Custom Dropdown Arrow -->
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
          Issue Description
        </label>
        <textarea
          v-model="description"
          rows="5"
          placeholder="Please describe your issue in detail..."
          class="bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full p-4 transition-all outline-none resize-y"
        ></textarea>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="mb-6 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200 shadow-sm relative overflow-hidden"
      >
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
        <div class="bg-emerald-100 rounded-full p-1 text-emerald-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <p class="text-emerald-700 text-sm font-semibold">{{ successMessage }}</p>
      </div>

      <!-- Submit Button -->
      <button
        @click="submitTicket"
        :disabled="!category || !priority || !description || loading"
        class="relative w-full sm:w-auto sm:min-w-[200px] overflow-hidden bg-blue-600 text-white font-semibold rounded-xl px-6 py-3.5 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] before:absolute before:inset-0 before:bg-white/20 before:translate-x-full hover:before:animate-[shimmer_1s] flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg v-else class="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        <span>{{ loading ? "Submitting..." : "Submit Ticket" }}</span>
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
