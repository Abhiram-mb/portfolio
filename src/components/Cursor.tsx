import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let hover = false;
    let animationFrame: number;

    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const loop = () => {
      if (!hover) {
        const delay = 6;

        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;

        gsap.set(cursor, {
          x: cursorPos.x,
          y: cursorPos.y,
        });
      }

      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);

    const elements = document.querySelectorAll("[data-cursor]");

    const handleMouseEnter = (e: Event) => {
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();

      if (element.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");

        gsap.to(cursor, {
          x: rect.left,
          y: rect.top,
          duration: 0.2,
          ease: "power2.out",
        });

        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }

      if (element.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;