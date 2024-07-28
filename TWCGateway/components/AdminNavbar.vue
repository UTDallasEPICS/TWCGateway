<script setup>
import {
  Bars3Icon,
  ArrowLeftEndOnRectangleIcon,
} from '@heroicons/vue/24/outline';

const config = useRuntimeConfig();
const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

async function navigateToUsers() {
  await navigateTo('/admin/users');
}

async function navigateToDepartments() {
  await navigateTo('/admin/departments');
}

async function logout() {
  try {
    await $fetch(`${config.public.BASEURL}/api/auth/logout`, {
      mode: 'no-cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error logging out:', error);
  }
  // window.location.href = `${config.public.BASEURL}`;
  // await navigateTo('/employee');
}
</script>

<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="hidden md:block flex-shrink-0">
            <img class="h-10" src="~/assets/Wtwcglogo.svg" alt="Logo" />
          </div>
          <div class="md:hidden flex-shrink-0">
            <img class="w-24" src="~/assets/twcglogo.svg" alt="Logo" />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <button
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                @click="navigateToUsers"
              >
                Users
              </button>
              <button
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                @click="navigateToDepartments"
              >
                Departments
              </button>
            </div>
          </div>
        </div>
        <div class="items-center hidden md:block">
          <button
            title="Logout"
            class="bg-red-100 bg-opacity-30 hover:bg-red-300 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            @click="logout"
          >
            <ArrowLeftEndOnRectangleIcon class="h-6 w-6" />
          </button>
        </div>
        <button
          @click="toggleMenu"
          class="md:hidden text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
        >
          <Bars3Icon class="h-6 w-6" />
        </button>
      </div>
    </div>

    <div class="md:hidden" v-show="isOpen">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <button
          class="border w-full text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          @click="navigateToUsers"
        >
          Users
        </button>
        <button
          class="border w-full text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          @click="navigateToDepartments"
        >
          Departments
        </button>
        <button
          class="border w-full text-gray-300 bg-red-100 bg-opacity-30 hover:bg-red-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
