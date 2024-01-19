<template>
  <button
    @click="toggleCard()"
    :disabled="!props.available"
    :class="{'shadow-input': props.isActive}"
    class="w-full h-full flex flex-row self-stretch bg-white border border-[#E9F0EB] rounded-[22px] cursor-pointer overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
  >
    <div class="w-full h-full flex flex-row px-8 py-6">
      <div class="w-1/2 flex flex-col items-start">
        <div class="w-full flex flex-col items-start gap-y-1 text-mainDark text-2xl font-bold capitalize">
          {{ formattedType }}
          <span v-if="!props.available" class="text-start text-mainDark text-opacity-20 text-xl font-normal hyphens-auto">Not availible in that city</span>
        </div>
        <span class="mt-auto text-[#78A1BB] text-3xl font-bold">{{ props.price }}$</span>
      </div>
      <PickUpIcon v-if="props.type === 'pickup'" class=" ml-auto w-[140px]"/> 
      <SmallCarIcon  v-else-if="props.type === 'courier'" class=" ml-auto w-[140px]"/>
      <BoxIcon v-else-if="props.type === 'post'"  class="ml-auto w-[140px]" />
    </div>
    <div v-if="props.isActive && props.available" class="w-[16%] min-h-[200px] h-full flex justify-center items-center bg-activeGradient">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" viewBox="0 0 20 20">
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
      </svg>
    </div>
  </button>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import PickUpIcon from 'icons/pickup.svg'
import SmallCarIcon from 'icons/small-car.svg'
import BoxIcon from 'icons/box.svg'
const props = defineProps<{
  type: string;
  available: boolean;
  price: number;
  isActive: boolean;
}>()

const emit = defineEmits();

const formattedType = computed(() => {
  if (props.type === 'pickup') {
    return 'Pick Up'
  }

  return props.type;
})

const toggleCard = () => {
  emit('toggle-active');
};
</script>