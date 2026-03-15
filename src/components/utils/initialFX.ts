import { SplitText } from "gsap-trial/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

let initialized = false;

export function initialFX() {
  if (initialized) return; // prevents duplicate animations
  initialized = true;

  document.body.style.overflowY = "auto";
  smoother.paused(false);

  document
    .getElementsByTagName("main")[0]
    .classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  /* -------- MAIN LANDING TEXT -------- */

  const landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );

  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 60 }, // reduced distance
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.025,
      delay: 0.3,
    }
  );

  /* -------- SECONDARY TEXT -------- */

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  const landingText2 = new SplitText(".landing-h2-info", TextProps);

  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.025,
      delay: 0.3,
    }
  );

  /* -------- SMALL TEXT -------- */

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.8,
    }
  );

  /* -------- HEADER -------- */

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: 0.1,
    }
  );

  /* -------- LOOP TEXT -------- */

  const landingText3 = new SplitText(".landing-h2-info-1", TextProps);
  const landingText4 = new SplitText(".landing-h2-1", TextProps);
  const landingText5 = new SplitText(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

/* ---------------- LOOP TEXT ---------------- */

function LoopText(Text1: SplitText, Text2: SplitText) {
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1,
    defaults: { ease: "power3.out", duration: 1 },
  });

  const delay = 4;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      delay: delay,
    }
  )
    .to(
      Text1.chars,
      {
        y: -60,
        stagger: 0.08,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -60,
        stagger: 0.08,
        delay: delay * 2,
      },
      0
    )
    .fromTo(
      Text1.chars,
      { y: 60 },
      {
        y: 0,
        stagger: 0.08,
        delay: delay * 2,
      },
      0
    );
}