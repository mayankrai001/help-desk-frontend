<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-slate-50 relative overflow-hidden"
  >
    <!-- Decorative background elements -->
    <div
      class="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-sky-300/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"
    ></div>

    <div
      class="relative z-10 text-center bg-white/80 backdrop-blur-2xl border border-white p-10 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-full max-w-[400px]"
    >
      <div class="flex justify-center mb-6">
        <svg
          class="animate-spin h-12 w-12 text-blue-600 drop-shadow-sm"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <h2 class="text-[1.5rem] font-bold text-slate-800 tracking-tight mb-2">
        Authenticating...
      </h2>
      <p class="text-slate-500 text-sm font-medium">
        Please wait while we complete your sign in.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthCallbackView",
  mounted() {
    this.handleCallback();
  },
  methods: {
    handleCallback() {
      const { token, user } = this.$route.query;

      if (token) {
        this.$store.commit("auth/SET_TOKEN", token);

        if (user) {
          try {
            const userData = JSON.parse(decodeURIComponent(user));
            this.$store.commit("auth/SET_USER", userData);

            const role = userData?.role?.toLowerCase();
            this.$router.push(role === "admin" ? "/dashboard" : "/my-tickets");
          } catch (e) {
            console.error("Failed to parse user data from callback:", e);
            this.$router.push("/login?error=invalid_user_data");
          }
        } else {
          // If no user object is provided from the backend, we might need to
          // fetch it from some '/auth/me' endpoint. However, if backend
          // sends user in query params, it will be handled above.
          this.$router.push("/my-tickets");
        }
      } else {
        // No token provided, meaning login essentially failed
        console.error("Authentication failed or missing tokens");
        this.$router.push("/login?error=auth_failed");
      }
    },
  },
};
</script>
