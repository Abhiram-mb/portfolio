import * as THREE from "three";

/* ---------------- SMOOTH STATE ---------------- */
let targetX = 0;
let targetY = 0;

/* ---------------- MOUSE ---------------- */
export const handleMouseMove = (
  event: MouseEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  targetX = (event.clientX / window.innerWidth) * 2 - 1;
  targetY = -(event.clientY / window.innerHeight) * 2 + 1;

  setMousePosition(targetX, targetY);
};

/* ---------------- TOUCH ---------------- */
export const handleTouchMove = (
  event: TouchEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const touch = event.touches[0];

  targetX = (touch.clientX / window.innerWidth) * 2 - 1;
  targetY = -(touch.clientY / window.innerHeight) * 2 + 1;

  setMousePosition(targetX, targetY);
};

/* ---------------- TOUCH END (SMOOTH RETURN) ---------------- */
export const handleTouchEnd = (
  setMousePosition: (
    x: number,
    y: number,
    interpolationX: number,
    interpolationY: number
  ) => void
) => {
  // smooth idle return
  setTimeout(() => {
    setMousePosition(0, 0, 0.02, 0.02);

    setTimeout(() => {
      setMousePosition(0, 0, 0.06, 0.08);
    }, 800);
  }, 1200);
};

/* ---------------- HEAD ROTATION ---------------- */
export const handleHeadRotation = (
  headBone: THREE.Object3D,
  mouseX: number,
  mouseY: number,
  interpolationX: number,
  interpolationY: number,
  lerp: (x: number, y: number, t: number) => number
) => {
  if (!headBone) return;

  const maxRotation = Math.PI / 6;

  // clamp inputs (removes jitter spikes)
  const x = THREE.MathUtils.clamp(mouseX, -1, 1);
  const y = THREE.MathUtils.clamp(mouseY, -1, 1);

  if (window.scrollY < 200) {
    /* ----- Y ROTATION (LOOK LEFT/RIGHT) ----- */
    headBone.rotation.y = lerp(
      headBone.rotation.y,
      x * maxRotation,
      interpolationY
    );

    /* ----- X ROTATION (LOOK UP/DOWN) ----- */
    const targetRotX = THREE.MathUtils.clamp(
      -y - 0.5 * maxRotation,
      -0.3,
      0.4
    );

    headBone.rotation.x = lerp(
      headBone.rotation.x,
      targetRotX,
      interpolationX
    );
  } else {
    // smooth resting pose
    if (window.innerWidth > 1024) {
      headBone.rotation.x = lerp(headBone.rotation.x, -0.4, 0.025);
      headBone.rotation.y = lerp(headBone.rotation.y, -0.3, 0.025);
    }
  }
};
