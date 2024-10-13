import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AirpodsAnimation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const airpods = useRef({ frame: 0 });

  const frameCount = 147;

  const currentFrame = (index) =>
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
      index + 1
    )
      .toString()
      .padStart(4, "0")}.jpg`;

  // Preload images on mount
  useEffect(() => {
    const loadedImages = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const render = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[airpods.current.frame], 200, 0);
  };

  // Setup GSAP animation when images are ready
  useEffect(() => {
    if (images.length === frameCount) {
      gsap.to(airpods.current, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        delay: 2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Pin until the animation completes
          scrub: 0.5,
          pin: true, // Pin the canvas section
        },
        onUpdate: render,
      });

      images[0].onload = render; // Render the first frame
    }
  }, [images]);

  const textRef = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      x: "-50%",
      duration: 1,
      ease: "power1.out",
      delay: 1,
    });
    gsap.from(textRef2.current, {
      opacity: 0,
      x: "-50%",
      duration: 2,
      ease: "power1.out",
      delay: 2,
    });
  }, []);

  return (
    <div div className="canvas_container">
      {/* Canvas Section */}
      <div
        ref={containerRef}
        style={{
          height: "100vh", // Full screen height for pinning
          position: "relative",
        }}
      >
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={700}
          style={{ display: "block", margin: "0 auto" }}
        />
        <h2 ref={textRef} className="heading_text">
          Airpods pro
        </h2>
        <p ref={textRef2} className="heading_description">
          Hearing Health features including Loud Sound Reduction, Conversation
          Boost and Background Sounds.
        </p>
      </div>
    </div>
  );
};

export default AirpodsAnimation;
