<template>
  <div class="container" ref="container"></div>
</template>
<script setup>
import * as Three from 'three'
import gsap from "gsap"
import { onMounted, ref, watch } from 'vue';
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
import AlarmSprite from '../three/mesh/AlarmSprite';
import LightWall from '../three/mesh/LightWall';
import FlyLineShader from '../three/mesh/FlyLineShader';
import LightRadar from '../three/mesh/LightRadar';
import eventHub from '@/utils/eventHub.js'
import controls from '@/three/controls.js'
const props = defineProps(["eventList"])

const container = ref(null)
const eventListMesh = [];
let mapFn = {
  火警: (position, i) => {
    const lightWall = new LightWall(1, 2, position);
    lightWall.eventListIndex = i;
    scene.add(lightWall.mesh);
    eventListMesh.push(lightWall)
  },
  治安: (position, i) => {
    //生成随机颜色
    const color = new Three.Color(
      Math.random(), Math.random(), Math.random()
    ).getHex();
    //添加着色器飞线
    const flyLineShader = new FlyLineShader(position, color);
    flyLineShader.eventListIndex = i;
    scene.add(flyLineShader.mesh)
    eventListMesh.push(flyLineShader)
  },
  电力: (position, i) => {
    //添加雷达
    const lightRadar = new LightRadar(2, position);
    lightRadar.eventListIndex = i;
    scene.add(lightRadar.mesh)
    eventListMesh.push(lightRadar)
  }
}
watch(() => props.eventList, (val) => {
  // console.log(val);
  eventListMesh.forEach((item) => {
    item.remove()
  })
  props.eventList.forEach((item, i) => {
    const position = {
      x: item.position.x / 5 - 10,
      z: item.position.y / 5 - 10,
    }
    const alarmSprite = new AlarmSprite(item.name, position);
    alarmSprite.onClick(() => {
      // console.log(item.name);
      eventHub.emit("spriteClick", { data: item, i })
    })
    alarmSprite.eventListIndex = i;
    eventListMesh.push(alarmSprite)
    scene.add(alarmSprite.mesh)
    if (mapFn[item.name]) {
      mapFn[item.name](position, i);
    }
  })

})

eventHub.on("titleClick", (i) => {
  eventListMesh.forEach((item) => {
    // console.log(item.eventListIndex, i);

    if (item.eventListIndex == i) {
      item.mesh.visible = true
    } else {
      item.mesh.visible = false
    }
  })
  const position = {
    x: props.eventList[i].position.x / 5 - 10,
    y: 0,
    z: props.eventList[i].position.y / 5 - 10,
  };
  //   controls.target.set(position.x, position.y, position.z);
  gsap.to(controls.target, {
    duration: 1,
    x: position.x,
    y: position.y,
    z: position.z,
  });

})


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
