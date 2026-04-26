<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold tracking-tight text-slate-800">Admin Management</h2>
      <p class="text-slate-500 mt-1">
        Manage up to <span class="font-semibold text-blue-600">6</span> sub-admins who can access the admin dashboard.
      </p>
    </div>

    <!-- Add Sub-Admin Card -->
    <div class="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-60"></div>

      <h3 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </span>
        Add Sub-Admin
      </h3>

      <!-- Limit Warning -->
      <div
        v-if="subAdminCount >= 6"
        class="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center gap-3 text-amber-800 text-sm font-medium"
      >
        <svg class="w-5 h-5 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        Maximum of 6 sub-admins reached. Remove one before adding another.
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <!-- Name -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Name <span class="text-slate-400 font-normal">(optional)</span></label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. John Doe"
              class="bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 p-3.5 transition-all outline-none"
            />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email <span class="text-red-400">*</span></label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              v-model="form.email"
              type="email"
              placeholder="e.g. user@cleantechsolar.com"
              class="bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 p-3.5 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-if="addError" class="mb-4 bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-3 text-red-700 text-sm">
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        {{ addError }}
      </div>

      <!-- Success -->
      <div v-if="addSuccess" class="mb-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-3 text-emerald-700 text-sm font-semibold">
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Sub-admin added successfully!
      </div>

      <button
        @click="handleAdd"
        :disabled="!form.email || addLoading || subAdminCount >= 6"
        class="bg-blue-600 text-white font-semibold rounded-xl px-6 py-3 hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 text-sm shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
      >
        <svg v-if="addLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        {{ addLoading ? "Adding..." : "Add Sub-Admin" }}
      </button>
    </div>

    <!-- Current Sub-Admins List -->
    <div class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
      <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <h3 class="text-lg font-bold text-slate-800">Current Sub-Admins</h3>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
          {{ subAdminCount }} / 6
        </span>
      </div>

      <!-- Loading -->
      <div v-if="subAdminLoading" class="py-12 flex items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>

      <!-- Empty State -->
      <div v-else-if="subAdmins.length === 0" class="py-14 flex flex-col items-center justify-center text-center">
        <div class="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
          <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p class="text-sm font-semibold text-slate-700">No sub-admins yet</p>
        <p class="text-xs text-slate-400 mt-1">Add up to 6 admins using the form above.</p>
      </div>

      <!-- List -->
      <ul v-else class="divide-y divide-slate-100">
        <li
          v-for="admin in subAdmins"
          :key="admin._id"
          class="flex items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition-colors group"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {{ initials(admin.name || admin.email) }}
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-800">{{ admin.name || "—" }}</p>
              <p class="text-xs text-slate-500">{{ admin.email }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-xs text-slate-400 hidden sm:block">
              Added {{ formatDate(admin.createdAt) }}
            </span>
            <button
              @click="handleRemove(admin._id)"
              :disabled="removingId === admin._id"
              title="Remove Sub-Admin"
              class="p-2 rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 hover:border-red-200 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              <svg v-if="removingId === admin._id" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "ManageAdmins",

  data() {
    return {
      form: { name: "", email: "" },
      addLoading: false,
      addError: "",
      addSuccess: false,
      removingId: null,
    };
  },

  computed: {
    ...mapGetters("subAdmin", ["subAdmins", "subAdminCount", "subAdminLoading"]),
  },

  mounted() {
    this.fetchSubAdmins();
  },

  methods: {
    ...mapActions("subAdmin", ["fetchSubAdmins", "addSubAdmin", "removeSubAdmin"]),

    async handleAdd() {
      this.addError = "";
      this.addSuccess = false;
      this.addLoading = true;
      try {
        await this.addSubAdmin({ email: this.form.email, name: this.form.name });
        this.form = { name: "", email: "" };
        this.addSuccess = true;
        setTimeout(() => (this.addSuccess = false), 3000);
      } catch (err) {
        this.addError = err.response?.data?.message || err.message || "Failed to add sub-admin.";
      } finally {
        this.addLoading = false;
      }
    },

    async handleRemove(id) {
      const result = await Swal.fire({
        title: "Remove Sub-Admin?",
        text: "They will lose admin access on their next login.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF4444",
        cancelButtonColor: "#94A3B8",
        confirmButtonText: "Yes, remove them"
      });

      if (!result.isConfirmed) return;
      
      this.removingId = id;
      try {
        await this.removeSubAdmin(id);
        Swal.fire({
          title: "Removed!",
          text: "Sub-admin access revoked.",
          icon: "success",
          confirmButtonColor: "#10B981",
          timer: 2000,
          showConfirmButton: false
        });
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.response?.data?.message || "Failed to remove sub-admin.",
          icon: "error",
          confirmButtonColor: "#EF4444"
        });
      } finally {
        this.removingId = null;
      }
    },

    initials(str) {
      if (!str) return "?";
      const parts = str.split(/[\s@.]+/);
      return parts
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() || "")
        .join("");
    },

    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  },
};
</script>
