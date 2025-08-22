#include <simplexNoise4d>

uniform float uTime;
uniform float uDeltaTime;
uniform sampler2D uInitialPositionTexture;

void main() {
  float time = uTime * 0.2;
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 particlePosition = texture(uParticlePosition, uv);
  vec4 initialPosition = texture(uInitialPositionTexture, uv);

  if (particlePosition.a >= 1.0) {
    particlePosition.xyz = initialPosition.xyz;
    particlePosition.a = fract(particlePosition.a);
  } else {
    float fieldStrength = simplexNoise4d(vec4(initialPosition.xyz * 0.5, time + 1.0));
    fieldStrength = smoothstep(0.0, 1.0, fieldStrength);

    vec3 flowField = vec3(
      simplexNoise4d(vec4(particlePosition.xyz + 0.0, time)),
      simplexNoise4d(vec4(particlePosition.xyz + 1.0, time)),
      simplexNoise4d(vec4(particlePosition.xyz + 2.0, time))
    );
    flowField = normalize(flowField);
    particlePosition.xyz += uDeltaTime * fieldStrength * flowField;

    particlePosition.a += uDeltaTime * 0.3;
  }

  gl_FragColor = particlePosition;
}
