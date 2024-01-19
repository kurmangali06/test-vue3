<template>
    <footer class="flex flex-wrap justify-between gap-6 mt-auto py-7 px-5 lg:px-0">
        <div class="text-mainDark text-sm font-normal text-opacity-50">
          All rights reserved<br />
          Fast service {{ getYear }}
        </div>
        <div class="w-fit flex flex-row items-center gap-x-2.5 select-none">
            <img :src="Logo"  class="w-10" alt="">
            <img :src="Maestro" alt="">
            <img :src="Mastercard" alt="">
            <img :src="Visa" alt="">
        </div>
      </footer>
</template>
<script lang="ts" setup>
import Logo from 'images/logo.png';
import Maestro from 'images/maestro.png';
import Mastercard from 'images/mastercard.png';
import Visa from 'images/visa.png';

import { computed } from 'vue';

const getYear = computed(() => {
  return new Date().getFullYear();
})
</script>
