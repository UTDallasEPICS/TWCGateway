<script setup>
const userRole = useCookie('role').value;
if (userRole === 'ADMIN') {
  await navigateTo('/admin/users');
} else if (userRole === 'EMPLOYEE') {
  await navigateTo('/employee');
} else if (userRole === 'SUPERVISOR') {
  await navigateTo('/supervisor');
} else {
  console.error('pages/index.vue >> userRole not found');
}
</script>

<template>
  <div class="flex h-screen justify-center items-center bg-gray-300">
    <h1 class="text-2xl p-2 border rounded-lg bg-white">Redirecting...</h1>
  </div>
</template>
