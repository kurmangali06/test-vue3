<template>
  <button
    class="absolute right-0 top-0 flex justify-center items-center text-white rounded-full z-10"
    :class="buttonClass"
    @click="buttonEmits()"
  >
    {{ props.variant === 'enter' ? 'enter' : 'X' }}
  </button>
</template>
<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import type { PropType } from 'vue'

type VariantType = 'enter' | 'delete';

const emit = defineEmits();

const props = defineProps({
  variant: {
    type: String as PropType<VariantType>,
    required: true,
    validator(value: string) {
      return ['enter', 'delete'].includes(value);
    },
  },
})

const buttonClass = computed(() => ({
  'w-fit h-full px-4 text-base leading-none font-bold bg-blueGradient uppercase lg:text-2xl lg:px-10': props.variant === 'enter',
  'w-[62px] h-full text-base lg:text-2xl bg-redGradient': props.variant === 'delete',
}));

const buttonEmits = () => {
  emit(props.variant);
};

</script>