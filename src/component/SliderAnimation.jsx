import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";
import slider1Image from "../image/airpods/slider1.jpg";
import slider2Image from "../image/airpods/slider2.jpg";
import slider3Image from "../image/airpods/slider3.jpg";
import slider4Image from "../image/airpods/slider4.jpg";
import slider5Image from "../image/airpods/slider5.jpg";
import slider6Image from "../image/airpods/slider6.jpg";
import slider7Image from "../image/airpods/slider7.jpg";
import slider8Image from "../image/airpods/slider8.jpg";
import slider9Image from "../image/airpods/slider9.jpg";
// import slider10Image from "../image/slider10.jpg";

gsap.registerPlugin(ScrollTrigger);
const imageArr = [
  slider1Image,
  slider2Image,
  slider3Image,
  slider4Image,
  slider5Image,
  slider6Image,
  slider7Image,
  slider8Image,
  slider9Image,
  //   slider10Image,
];
const SliderAnimation = () => {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef();
  const demoRef = useRef();

  useEffect(() => {
    const images = gsap.utils.toArray("img");
    const updateProgress = (instance) => {
      const percentage = Math.round(
        (instance.progressedCount * 100) / images.length
      );
      setProgress(percentage);
    };

    const showDemo = () => {
      document.body.style.overflow = "auto";
      document.scrollingElement.scrollTo(0, 0);
      gsap.to(loaderRef.current, { autoAlpha: 0 });

      gsap.utils.toArray("section").forEach((section, index) => {
        const wrapper = section.querySelector(".wrapper");
        const [x, xEnd] =
          index % 2
            ? ["100%", (wrapper?.scrollWidth - section.offsetWidth) * -1]
            : [wrapper?.scrollWidth * -1, 0];

        gsap.fromTo(
          wrapper,
          { x },
          {
            x: xEnd,
            scrollTrigger: {
              trigger: section,
              scrub: 0.5,
            },
          }
        );
      });
    };

    imagesLoaded(images).on("progress", updateProgress).on("always", showDemo);
  }, []);

  return (
    <div ref={demoRef}>
      <div className="loader flex justify-center items-center" ref={loaderRef}>
        <div>
          <h1>Loading</h1>
          <h2 className="loader--text">{progress}%</h2>
        </div>
      </div>

      <div className="demo-wrapper">
        <header className="flex justify-center items-center">
          <div>
            <h1>ScrollTrigger</h1>
            <h2>demo</h2>
          </div>
        </header>

        <SectionText text="Control what you hear. And what you don’t." />
        {Array(4)
          .fill()
          .map((_, index) => (
            <GallerySection key={index} />
          ))}
        <SectionText text="Immersive sound.Fine-tuned to you." />
      </div>
    </div>
  );
};

const SectionText = ({ text }) => (
  <section className="demo-text">
    <div className="wrapper text">{text}</div>
  </section>
);

const GallerySection = () => (
  <section className="demo-gallery">
    <ul className="wrapper">
      {imageArr.map((key, index) => (
        <li key={index} className="gallary_image_wrapper">
          <img src={key} alt="Random Unsplash" />
        </li>
      ))}
    </ul>
  </section>
);

export default SliderAnimation;
