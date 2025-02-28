<template>
  <div class="container" ref="container"></div>
</template>
<script setup>
import * as Three from 'three'
import gsap from "gsap"
import { onMounted, ref } from 'vue';
//引入轨道控制器ongzhiqi
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


import scene from "@/three/scene.js"
import camera from "@/three/camera.js"
import axesHelper from '@/three/axesHeler';
import renderer from "@/three/renderer.js"
import "@/three/init.js"
import render from '@/three/render';
import gui from '@/three/gui';
import createCity from '../three/mesh/city';

const container = ref(null)



scene.add(camera)

scene.add(axesHelper)








onMounted(() => {
  container.value.appendChild(renderer.domElement);
  createCity()
  render()
})


</script>
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  /* background-color: aqua; */
}
</style>
