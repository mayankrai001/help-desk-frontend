<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 py-8">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p v-if="errorMessage" class="text-red-500 text-sm mb-4">
        {{ errorMessage }}
      </p>

      <button
        :disabled="loading"
        @click="handleLogin"
        class="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white w-full p-3 rounded-lg font-medium transition"
      >
        {{ loading ? "Logging in..." : "Login" }}
      </button>

      <p class="text-center text-gray-600 mt-6 text-sm">
        Don't have an account?
        <router-link to="/signup" class="text-blue-500 hover:text-blue-600 font-medium">
          Sign Up
        </router-link>
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "LoginView",

  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),

    async handleLogin() {
      if (!this.email?.trim() || !this.password) {
        this.errorMessage = "Email and password are required.";
        return;
      }

      this.loading = true;
      this.errorMessage = "";

      try {
        await this.login({
          email: this.email.trim(),
          password: this.password,
        });

        const role = this.$store.getters["auth/currentUser"]?.role?.toLowerCase();
        this.$router.push(role === "admin" ? "/dashboard" : "/my-tickets");
      } catch (error) {
        this.errorMessage = error?.response?.data?.message || "Login failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
