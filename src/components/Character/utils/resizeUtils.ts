import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

let resizeTimeout: number | null = null;

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) return;

  // throttle resize events
  if (resizeTimeout) {
    cancelAnimationFrame(resizeTimeout);
  }

  resizeTimeout = requestAnimationFrame(() => {
    const rect = canvasDiv.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    // update renderer
    renderer.setSize(width, height, false);

    // update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // keep the "work" trigger alive
    const workTrigger = ScrollTrigger.getById("work");

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger !== workTrigger) {
        trigger.kill();
      }
    });

    // rebuild animations
    setCharTimeline(character, camera);
    setAllTimeline();

    // refresh ScrollTrigger layout
    ScrollTrigger.refresh();
  });
}
