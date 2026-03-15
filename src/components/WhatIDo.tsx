import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
  const listeners: ((e: Event) => void)[] = [];

  if (ScrollTrigger.isTouch) {
    containerRef.current.forEach((container) => {
      if (container) {
        container.classList.remove("what-noTouch");

        const listener = () => handleClick(container);
        listeners.push(listener);

        container.addEventListener("click", listener);
      }
    });
  }

  return () => {
    containerRef.current.forEach((container, index) => {
      if (container && listeners[index]) {
        container.removeEventListener("click", listeners[index]);
      }
    });
  };
}, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

           <div className="what-content-in">
  <h3>FRONTEND</h3>
  <h4>Building Modern & Responsive Interfaces</h4>
 <p>
  Building responsive and interactive user interfaces using modern 
  JavaScript frameworks with a focus on performance and clean design.
</p>
  <h5>Skillset & tools</h5>
  <div className="what-content-flex">
    <div className="what-tags">React.js</div>
    <div className="what-tags">Vue.js</div>
    <div className="what-tags">TypeScript</div>
    <div className="what-tags">JavaScript</div>
    <div className="what-tags">Tailwind CSS</div>
    <div className="what-tags">Hero UI</div>
    <div className="what-tags">HTML5</div>
    <div className="what-tags">CSS3</div>
  </div>
  <div className="what-arrow"></div>
</div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
  <h3>BACKEND</h3>
  <h4>Building APIs & Server Logic</h4>
  <p>
    Developing backend services using Node.js and TypeScript. 
    Focused on building REST APIs, handling server logic, and 
    integrating applications with cloud services.
  </p>
  <h5>Skillset & tools</h5>
  <div className="what-content-flex">
    <div className="what-tags">Node.js</div>
    <div className="what-tags">TypeScript</div>
    <div className="what-tags">REST APIs</div>
    <div className="what-tags">Google Cloud Platform</div>
  <div className="what-tags">Cloud Functions</div>
  <div className="what-tags">Cloud Tasks</div>
  <div className="what-tags">Cloud SQL</div>
    <div className="what-tags">JavaScript</div>
  </div>
  <div className="what-arrow"></div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
