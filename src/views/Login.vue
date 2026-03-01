<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        v-model="email"
        placeholder="Email"
        class="border w-full p-2 mb-4 rounded"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border w-full p-2 mb-4 rounded"
      />

      <button
        @click="handleLogin"
        class="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded"
      >
        Login
      </button>
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
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),

    async handleLogin() {
      await this.login({
        email: this.email,
        password: this.password,
      });

      this.$router.push("/dashboard");
    },
  },
};
</script>
