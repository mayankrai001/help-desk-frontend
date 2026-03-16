<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-50 relative overflow-hidden py-10">
    <!-- Decorative background elements -->
    <div class="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>
    <div class="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-sky-300/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>
    <div class="absolute top-[20%] right-[10%] w-[25%] h-[25%] bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>

    <div class="relative w-full max-w-[480px] px-6 z-10">
      <!-- Card Container -->
      <div class="bg-white/80 backdrop-blur-2xl border border-white p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300">
        
        <!-- Logo / Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-tr from-blue-50 to-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center shadow-[0_8px_16px_rgba(59,130,246,0.15)] transform transition hover:scale-105 duration-300">
            <svg class="w-8 h-8 text-blue-600 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
        </div>

        <h2 class="text-[1.75rem] font-bold mb-2 text-center text-slate-800 tracking-tight">Create Account</h2>
        <p class="text-center text-slate-500 mb-8 text-sm font-medium">Join us to start managing your tickets.</p>

        <!-- Form Elements -->
        <div class="space-y-4">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Full Name</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <input
                v-model="name"
                type="text"
                placeholder="John Doe"
                class="bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 p-3.5 transition-all outline-none"
              />
            </div>
          </div>

          <!-- Email address -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email address</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
              </div>
              <input
                v-model="email"
                type="email"
                placeholder="name@company.com"
                class="bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 p-3.5 transition-all outline-none"
              />
            </div>
          </div>

          <!-- Company Name -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Company Name</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <input
                v-model="companyName"
                type="text"
                placeholder="Company Ltd."
                class="bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 p-3.5 transition-all outline-none"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Password</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <input
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block w-full pl-11 p-3.5 transition-all outline-none"
                @keyup.enter="handleSignup"
              />
            </div>
          </div>

          <!-- Error message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-100 rounded-xl p-3 mt-4 flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200 shadow-sm relative overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
            <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p class="text-red-600 text-sm font-medium leading-tight pt-0.5">{{ errorMessage }}</p>
          </div>

          <!-- Submit Button -->
          <button
            :disabled="loading"
            @click="handleSignup"
            class="relative w-full overflow-hidden bg-blue-600 text-white font-semibold rounded-xl p-3.5 mt-6 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] before:absolute before:inset-0 before:bg-white/20 before:translate-x-full hover:before:animate-[shimmer_1s]"
          >
            <!-- Button content -->
            <span class="relative z-10 flex items-center justify-center gap-2">
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? "Creating account..." : "Sign Up" }}
            </span>
          </button>

          <div class="flex items-center justify-center gap-2 mt-6">
            <span class="text-slate-500 text-sm">Already have an account?</span>
            <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors border-b border-transparent hover:border-blue-700">
              Sign In
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignupView",

  data() {
    return {
      name: "",
      email: "",
      companyName: "",
      password: "",
      loading: false,
      errorMessage: "",
    };
  },

  methods: {
    ...mapActions("auth", ["signup"]),

    async handleSignup() {
      if (!this.name?.trim() || !this.email?.trim() || !this.password?.trim()) {
        this.errorMessage = "Name, email and password are required.";
        return;
      }

      this.loading = true;
      this.errorMessage = "";

      try {
        await this.signup({
          name: this.name.trim(),
          email: this.email.trim(),
          companyName: this.companyName?.trim() || undefined,
          password: this.password,
        });

        this.$router.push(this.$store.getters["auth/currentUser"]?.role?.toLowerCase() === "admin" ? "/dashboard" : "/my-tickets");
      } catch (error) {
        this.errorMessage = error?.response?.data?.message || "Sign up failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
