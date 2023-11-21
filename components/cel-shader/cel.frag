#include <common>
#include <lights_pars_begin>

uniform vec3 uColor;
uniform float uGlossiness;

varying vec3 vNormal;
varying vec3 vPointLightDirection;
varying float vPointLightDistance;
varying vec3 vVertexToCameraDirection;

void main() {
  // Directional Light
  float NdotL = dot(vNormal, directionalLights[0].direction);
  float numBands = 3.0;
  float q = ((NdotL + 1.0) / 2.0) * numBands;
  // float lightIntensity = smoothstep(-0.01, 0.01, NdotL);
  float lightIntensity = floor(q) / (numBands - 1.0);
  vec3 directionalLight = lightIntensity * directionalLights[0].color;

  // -1 : 0
  // -0.5 : 0
  // -0.3 : 0.5
  // 0 : 0.5
  // 0.3 : 1
  // 1 : 1

  // Point Light
  float NdotPL = dot(vNormal, vPointLightDirection);
  float pointLightIntensity = smoothstep(-0.01, 0.01, NdotPL);
  vec3 pointLight = pointLightIntensity * pointLights[0].color * (20.0 / vPointLightDistance);

  // Specular Highlight
  vec3 halfVector = normalize(directionalLights[0].direction + vVertexToCameraDirection);
  float NdotH = dot(halfVector, vNormal);
  float specularIntensity = pow(NdotH * lightIntensity, 1000.0 / uGlossiness);
  float specularIntensitySmooth = smoothstep(0.05, 0.1, specularIntensity);
  vec3 specular = specularIntensitySmooth * directionalLights[0].color;

  // Rim Light
  float rimDot = 1.0 - dot(vVertexToCameraDirection, vNormal);
  float rimAmount = 0.8;
  float rimThreshold = 0.2;
  float rimIntensity = rimDot * pow(NdotL, rimThreshold);
  rimIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, rimIntensity);
  vec3 rim = rimIntensity * directionalLights[0].color;

  gl_FragColor = vec4(uColor * (ambientLightColor + directionalLight + pointLight + specular + rim), 1.0);
}
