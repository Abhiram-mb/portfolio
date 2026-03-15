import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { eyebrowBoneNames, typingBoneNames } from "../../../data/boneData";

const setAnimations = (gltf: GLTF) => {
  let character = gltf.scene;
  let mixer = new THREE.AnimationMixer(character);

  if (gltf.animations) {
    /* ---------------- INTRO ---------------- */
    const introClip = gltf.animations.find(
      (clip) => clip.name === "introAnimation"
    );

    if (introClip) {
      const introAction = mixer.clipAction(introClip);
      introAction.setLoop(THREE.LoopOnce, 1);
      introAction.clampWhenFinished = true;
      introAction.fadeIn(0.6).play(); // ✅ smooth start
    }

    /* ---------------- KEYBOARD LOOPS ---------------- */
    const clipNames = ["key1", "key2", "key5", "key6"];

    clipNames.forEach((name) => {
      const clip = THREE.AnimationClip.findByName(gltf.animations, name);

      if (!clip) {
        console.error(`Animation "${name}" not found`);
        return;
      }

      const action = mixer.clipAction(clip);
      action.timeScale = 1.2;
      action.fadeIn(0.5).play(); // ✅ smooth blending
    });

    /* ---------------- TYPING BONES ---------------- */
    const typingAction = createBoneAction(
      gltf,
      mixer,
      "typing",
      typingBoneNames
    );

    if (typingAction) {
      typingAction.enabled = true;
      typingAction.timeScale = 1.2;
      typingAction.fadeIn(0.5).play(); // ✅ smooth
    }
  }

  /* ---------------- INTRO TRIGGER ---------------- */
  function startIntro() {
    const introClip = gltf.animations.find(
      (clip) => clip.name === "introAnimation"
    );

    if (!introClip) return;

    const introAction = mixer.clipAction(introClip);

    introAction.reset();
    introAction.clampWhenFinished = true;
    introAction.fadeIn(0.6).play(); // ✅ smooth restart

    setTimeout(() => {
      const blink = gltf.animations.find((clip) => clip.name === "Blink");
      if (!blink) return;

      mixer.clipAction(blink).reset().fadeIn(0.5).play();
    }, 2500);
  }

  /* ---------------- HOVER (SMOOTH FIX) ---------------- */
  function hover(gltf: GLTF, hoverDiv: HTMLDivElement) {
    if (!hoverDiv) return;

    const eyeBrowUpAction = createBoneAction(
      gltf,
      mixer,
      "browup",
      eyebrowBoneNames
    );

    if (!eyeBrowUpAction) return;

    eyeBrowUpAction.setLoop(THREE.LoopOnce, 1);
    eyeBrowUpAction.clampWhenFinished = true;
    eyeBrowUpAction.enabled = true;
    eyeBrowUpAction.setEffectiveWeight(1); // ✅ FIXED (was 4)

    let isHovering = false;

    const onHoverFace = () => {
      if (isHovering) return;
      isHovering = true;

      eyeBrowUpAction
        .reset()
        .fadeIn(0.35) // ✅ smooth enter
        .play();
    };

    const onLeaveFace = () => {
      if (!isHovering) return;
      isHovering = false;

      eyeBrowUpAction.fadeOut(0.45); // ✅ smooth exit
    };

    hoverDiv.addEventListener("mouseenter", onHoverFace);
    hoverDiv.addEventListener("mouseleave", onLeaveFace);

    return () => {
      hoverDiv.removeEventListener("mouseenter", onHoverFace);
      hoverDiv.removeEventListener("mouseleave", onLeaveFace);
    };
  }

  return { mixer, startIntro, hover };
};

/* ===================================================== */

const createBoneAction = (
  gltf: GLTF,
  mixer: THREE.AnimationMixer,
  clip: string,
  boneNames: string[]
): THREE.AnimationAction | null => {
  const AnimationClip = THREE.AnimationClip.findByName(gltf.animations, clip);

  if (!AnimationClip) {
    console.error(`Animation "${clip}" not found in GLTF file.`);
    return null;
  }

  const filteredClip = filterAnimationTracks(AnimationClip, boneNames);

  return mixer.clipAction(filteredClip);
};

const filterAnimationTracks = (
  clip: THREE.AnimationClip,
  boneNames: string[]
): THREE.AnimationClip => {
  const filteredTracks = clip.tracks.filter((track) =>
    boneNames.some((boneName) => track.name.includes(boneName))
  );

  return new THREE.AnimationClip(
    clip.name + "_filtered",
    clip.duration,
    filteredTracks
  );
};

export default setAnimations;
