<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white p-6 shadow rounded">Total Tickets</div>

      <div class="bg-white p-6 shadow rounded">Open Tickets</div>

      <div class="bg-white p-6 shadow rounded">Completed Tickets</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
};
</script>
