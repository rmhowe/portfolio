#include <common>
#include <lights_pars_begin>

varying vec3 vNormal;
varying vec3 vPointLightDirection;
varying vec3 vVertexToCameraDirection;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 clipPosition = projectionMatrix * viewPosition;

  vNormal = normalize(normalMatrix * normal);
  vPointLightDirection = normalize(pointLights[0].position - clipPosition.xyz);
  vVertexToCameraDirection = normalize(-viewPosition.xyz);

  gl_Position = clipPosition;
}
