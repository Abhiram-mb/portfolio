import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  /* ---------------- DIRECTIONAL ---------------- */
  const directionalLight = new THREE.DirectionalLight(0x5eead4, 0);
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;

  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;

  scene.add(directionalLight);

  /* ---------------- POINT LIGHT ---------------- */
  const pointLight = new THREE.PointLight(0x22d3ee, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  /* ---------------- HDR ENV ---------------- */
  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr?v=2", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;

      // prevent lighting POP
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      scene.environment = texture;

      // animate via proxy (smooth)
      const envProxy = { intensity: 0 };

      gsap.to(envProxy, {
        intensity: 0,
        duration: 0,
        onUpdate: () => {
          (scene as any).environmentIntensity = envProxy.intensity;
        },
      });
    });

  /* ---------------- SCREEN LIGHT REACTION ---------------- */
  const lightProxy = { intensity: 0 };

  function setPointLight(screenLight: any) {
    const target =
      screenLight.material.opacity > 0.9
        ? screenLight.material.emissiveIntensity * 20
        : 0;

    // smooth interpolation instead of jump
    gsap.to(lightProxy, {
      intensity: target,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
      onUpdate: () => {
        pointLight.intensity = lightProxy.intensity;
      },
    });
  }

  /* ---------------- LIGHT INTRO ---------------- */
  const duration = 2;
  const ease = "power2.inOut";

  function turnOnLights() {
    const envProxy = { intensity: 0 };

    gsap.to(envProxy, {
      intensity: 0.64,
      duration,
      ease,
      onUpdate: () => {
        (scene as any).environmentIntensity = envProxy.intensity;
      },
    });

    gsap.to(directionalLight, {
      intensity: 1,
      duration,
      ease,
    });

    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
      ease: "power2.out",
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
