<script setup>
import HelloWorld from './components/ThreeCanvas.vue'
import BigScreen from './components/BigScreen.vue';

import { getSmartCityInfo, getSmartCityList } from '@/api/api';
import { onMounted, reactive, ref } from 'vue';
import gsap from 'gsap';

onMounted(() => {
  getCityInfo()
  getCityList()
  setInterval(() => {
    getCityInfo()
    getCityList()

  }, 5000)
})

const eventList = ref([])
const dataInfo = reactive({
  iot: { number: 0 },
  event: { number: 0 },
  power: { number: 0 },
  test: { number: 0 },
})
const getCityInfo = async () => {
  let res = await getSmartCityInfo()
  // console.log(res.data);
  // dataInfo.iot = res.data.data.iot
  // dataInfo.test = res.data.data.test
  // dataInfo.event = re
  for (let key in dataInfo) {
    dataInfo[key].name = res.data.data[key].name;
    dataInfo[key].unit = res.data.data[key].unit;
    gsap.to(dataInfo[key], {
      number: res.data.data[key].number,
      duration: 1
    })
  }
}
const getCityList = async () => {
  let res = await getSmartCityList()
  eventList.value = res.data.list;
  // console.log(eventList.value);

}


</script>

<template>

  <HelloWorld :eventList="eventList" />
  <BigScreen :dataInfo="dataInfo" :eventList="eventList" />
</template>

<style scoped></style>
