varying vec3 vPosition;
varying vec2 vUv;
void main(){
  vec4 viewPosition=viewMatrix*modelMatrix*vec4(position,1.0);
  gl_Position=projectionMatrix*viewPosition;
  vPosition=position;
  vUv=uv;
}