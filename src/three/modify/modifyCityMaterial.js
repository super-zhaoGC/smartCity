import * as Three from "three"
import gsap from "gsap"


const modifyCityMaterial = (mesh) => {
  // console.log(material.fra);

  mesh.material.onBeforeCompile = (shader) => {

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
        #include <dithering_fragment>
        //#end#
        `
    )


    addGradColor(shader, mesh)
    addSpread(shader)
    addLightLine(shader)
  }
}

// 添加渐变色
const addGradColor = (shader, mesh) => {
  mesh.geometry.computeBoundingBox();
  console.log(mesh.geometry.boundingBox);
  let { max, min } = mesh.geometry.boundingBox;
  const uHeight = max.y - min.y;

  shader.uniforms.uTopColor = {
    value: new Three.Color('#aaaeff')
  }
  shader.uniforms.uHeight = {
    value: uHeight
  }
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
        #include <common>
        varying vec3 vPosition;
      `
  )
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
        #include <begin_vertex>
        vPosition=position;


        `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
        #include <common>

        uniform vec3 uTopColor;
        uniform float uHeight;
        varying vec3 vPosition;
      `

  )
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
        vec4 disGradColor=gl_FragColor;

        //设置混合的百分比
        float gradMix=(vPosition.y+uHeight/2.0)/uHeight;
        //计算出混合颜色
        vec3 gradMixColor=mix(disGradColor.xyz,uTopColor,gradMix);
        gl_FragColor=vec4(gradMixColor,1);

        //#end#
        `
  )
}

//添加建筑材质光波扩散特效
const addSpread = (shader, center = new Three.Vector2(0, 0)) => {
  //设置扩散的中心点
  shader.uniforms.uSpreadCenter = { value: center };
  //扩散时间
  shader.uniforms.uSpreadTime = { value: -2000 };
  //设置条带的宽度
  shader.uniforms.uSpreadWidth = { value: 40 };
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>
      uniform vec2 uSpreadCenter;
      uniform float uSpreadTime;
      uniform float uSpreadWidth;
      `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
    float spreadRadius=distance(vPosition.xz,uSpreadCenter);
    //扩散范围的函数
    float spreadIndex=-(spreadRadius-uSpreadTime)*(spreadRadius-uSpreadTime)+uSpreadWidth;

    if(spreadIndex>0.0){
      gl_FragColor=mix(gl_FragColor,vec4(1,1,1,1),spreadIndex/uSpreadWidth);
    }

    //#end#
    `
  );
  gsap.to(shader.uniforms.uSpreadTime, {
    value: 600,
    duration: 3,
    ease: "none",
    repeat: -1,
  })
}

const addLightLine = (shader) => {
  //扩散时间
  shader.uniforms.uLightLineTime = { value: -1500 };
  //设置条带宽度
  shader.uniforms.uLightLineWidth = { value: 200 };
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",

    `
    #include <common>
    uniform float uLightLineTime;
    uniform float uLightLineWidth;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
    float LightLineMix=-(vPosition.x+vPosition.z-uLightLineTime)*(vPosition.x+vPosition.z-uLightLineTime)+uLightLineWidth;
    if(LightLineMix>0.0){
      gl_FragColor=mix(gl_FragColor,vec4(0.8,1.0,1.0,1),LightLineMix/uLightLineWidth);
    }

    //#end#
    `
  )

  gsap.to(shader.uniforms.uLightLineTime, {
    value: 1500,
    duration: 5,
    ease: "none",
    repeat: -1,
  })

}



export default modifyCityMaterial