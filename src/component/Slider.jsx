import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image1 from "../image/airpods/slide1.jpg";
import image2 from "../image/airpods/slide2.jpg";
import image3 from "../image/airpods/slide3.jpg";
import image4 from "../image/airpods/slide4.jpg";
import image5 from "../image/airpods/slide5.jpg";
import image6 from "../image/airpods/slide6.png";

gsap.registerPlugin(ScrollTrigger);

const imageArr = [image1, image2, image3, image4, image5, image6];

const ScrollSections = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const getRatio = (el) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);

    const sections = sectionsRef.current;

    gsap.utils.toArray(sections).forEach((section, i) => {
      const bg = section.querySelector(".bg");
      bg.style.backgroundImage = `url(${imageArr[i]})`;

      gsap.fromTo(
        bg,
        {
          backgroundPosition: () =>
            i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px",
        },
        {
          backgroundPosition: () =>
            `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => (i ? "top bottom" : "top top"),
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true, // to make it responsive
          },
        }
      );
    });

    // Cleanup function to kill ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          style={{ height: "100vh", position: "relative" }}
        >
          <div
            className="bg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundSize: "cover",
              backgroundPosition: "50% 0",
            }}
          ></div>
          {/* <h2 style={{ position: "relative", zIndex: 1, color: "#fff" }}>
            Section {index + 1}
          </h2> */}
        </section>
      ))}
    </div>
  );
};

export default ScrollSections;
