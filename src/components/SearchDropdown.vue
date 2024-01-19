<template>
   <div :class="{'pb-4 rounded-[30px] border-l border-r border-b shadow-input': listVisible}" class="bg-white">
      <div class="relative w-full h-full">
        <input
          id="searchInput"
          type="text" 
          placeholder="Enter name of the city"
          v-model="inputData"
          @focus="showAllCities = true"
          @input="handleInput"
          autocomplete=""
          :class="{
            'pr-[34%] border-none': listVisible,
            'border-[red]': buttonType === 'delete'
          }"
          class="w-full py-4 px-9 text-mainDark text-2xl leading-none font-bold border border-[#E9F0EB] outline-none rounded-full placeholder:text-lg placeholder:text-[#D9E4DC] placeholder:font-normal caret-blue-500"
        />
        <Button 
          v-if="inputData"
          :variant="buttonType"
          @enter="sendQuery()"
          @delete="inputData = ''"
        />
      </div>
      <Transition v-if="listVisible">
        <ul class="max-h-[400px] h-full w-full px-4 z-30 overflow-y-auto">
          <li 
            @click="inputData = city" 
            v-for="(city, idx) in (showAllCities ? popularCities : matchingCities)" 
            :key="idx" 
            class="flex flex-row items-center justify-between px-5 py-2.5 text-mainDark text-xl border-[#E9F0EB] border-b cursor-pointer last-of-type:border-none hover:bg-black hover:bg-opacity-10"
          >
            {{ city }}
            <span 
              v-if="availableCities.includes(city)" 
              class="text-lightGray text-base"
            >
              availible
            </span>
          </li>
        </ul>
      </Transition>
    </div>
    <span class="inline-block py-1 text-[red]">{{ error ? error : '' }}</span>
  </template>

  <script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { popularCities, availableCities } from '../constants';
import Button from './Button .vue';

const error = ref<string>('');
const inputData = ref<string>('');
const matchingCities = ref<string[]>([]);
const buttonType = ref<string>('')
const showAllCities = ref<boolean>(false);
const router = useRouter();

const listVisible = computed(() => {
  return showAllCities.value || (inputData.value.length > 0 && matchingCities.value.length > 0);
});

const handleInput = () => {
  error.value = '';
  inputData.value.length ? showAllCities.value = false : showAllCities.value = true;
};

const closeDropdown = (e: MouseEvent) => {
  if (!document?.getElementById("searchInput")?.contains(e.target as Node)) {
    showAllCities.value = false
  }
};

const sendQuery = () => {
  const formattedData = inputData.value.trim().replace(/ /g, '').toLowerCase();

  if (availableCities.includes(inputData.value)) {
    error.value = '';

    router.push({
      name: '',
      query: { search: formattedData },
    });
  } else {
    error.value = 'We didn’t found such city. Please check spelling'
  }
}

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});

watch(() => inputData.value, (newValue) => {
  matchingCities.value = popularCities.filter(city => city.toLowerCase().includes(newValue.toLowerCase()));
  buttonType.value = matchingCities.value.length > 0 ? 'enter' : 'delete';
});

watch(inputData, (newInputData) => {
  if (!newInputData) {
    router.replace({ query: {} });
  }
});
</script>