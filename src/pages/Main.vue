<template >
    <div v-if="isView" class="w-full flex justify-center">
        <div class="absolute right-[15%] top-10 text-black text-4xl text-opacity-10 font-bold lg:text-[90px] lg:leading-[80px]">
          Fast <br />
          Service </div>
          <CarIcon
          :class="{'car-animation': !route.query.search}"
          class="max-w-[240px] transition-all z-30 md:max-w-[400px]"/>
        <RoadIcon class="absolute bottom-0 right-0" />
        <LineIcon class="absolute -bottom-20 lg:-bottom-10 xl:bottom-10 2xl:bottom-[10%]" />
    </div>
    <div v-else class="w-full h-full flex flex-col gap-y-5">
      <DeliveryCard 
        v-for="(info, index) in resFeik" 
        :key="index"
        :type="info.type"
        :available="info.available"
        :price="info.price"
        :isActive="index === activeElementIndex"
        @toggle-active="toggleActiveCard(index)"
        class="flex-1"
      />
    </div>
</template>
<script setup lang="ts">
import CarIcon from '../components/CarIcon.vue'
import RoadIcon from 'icons/road.svg'
import LineIcon from 'icons/line.svg'
import { fetchDelivery } from '../service';
import { useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
import DeliveryCard from '../components/DeliveryCard.vue'

const route = useRoute()
const isView = ref<boolean>(true);
const deliveryInfo = ref();
const activeElementIndex = ref();

const cityName = computed(() => {
  return route.query.search as string;
});
const fetchDeliveryInfo = (search: string) => {
  fetchDelivery(search)
    .then((res) => {
      isView.value = false
      deliveryInfo.value = res;
    })
    .catch((e) => {
      if(e instanceof Error)
        console.error(e.message);
    })
};
const toggleActiveCard = (index: number) => {
  activeElementIndex.value = index;
};


watch(() => cityName.value, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    fetchDeliveryInfo(newValue);
  }
});
</script>

<style scoped>
.car-animation {
  animation: moveCar 2s linear infinite;
}

@keyframes moveCar {
    0%, 100% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(100px, 100px);
      }
}
@media (max-width: 600px) {
  @keyframes moveCar {
      0%, 100% {
          transform: translate(0, 0);
      }
      50% {
          transform: translate(40px, 40px);
  }
}
}

</style>