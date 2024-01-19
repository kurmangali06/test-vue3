<script  setup lang="ts">
import { popularCities } from '../constants';
import SearchDropdown from './SearchDropdown.vue';

</script>

<template>
  <main class="flex flex-col py-[40px]">
    <div class="flex flex-col gap-y-4">
      <h1 class="text-mainDark text-4xl font-bold lg:text-5xl">
        Delivery cost
      </h1>
      <span class="text-base text-lightGray font-normal select-none hyphens-auto lg:text-2xl">
        Enter name of the city to count delivery cost
      </span>
    </div>

    <div class="w-full pt-10 lg:pt-20">
      <SearchDropdown />
    </div>

    <div class="flex flex-col gap-y-5 pt-10 sm:gap-y-10 lg:pt-20">
      <h3 class="text-base text-mainDark font-normal select-none lg:text-2xl">
        Most popular cities
      </h3>
      <div class="grid grid-cols-2 gap-x-3 lg:gap-x-20">
        <div class="border-[#E9F0EB] border-b" v-for="(city, idx) in popularCities" :key="idx">
          <span class="inline-block py-4 px-4 text-lightGray text-sm lg:px-5 lg:text-xl">{{ city }}</span>
        </div>
      </div>
    </div>
  </main>
</template>