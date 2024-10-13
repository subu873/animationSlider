import { useEffect, useRef, useState } from "react";
import airpodsMaxBlue from "../image/airpods_max_blue.png";
import airpodsMaxBlack from "../image/airpods_max_black.png";
import airpodsMaxStardust from "../image/airpods_max_stardust.png";
import airpodsMaxOrange from "../image/airpods_max_orange.png";
import airpodsMaxPurple from "../image/airpods_max_purple.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgArr = [
  airpodsMaxStardust,
  airpodsMaxOrange,
  airpodsMaxPurple,
  airpodsMaxBlue,
  airpodsMaxBlack,
];

const AirpodsMaxAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const imageRef = useRef(null);
  const textRef = useRef(null);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imgArr.length);
  };

  // Set up an effect to automatically change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 1000); // Change every 3000ms (3 seconds)
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  useEffect(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      x: "-50%",
      duration: 1,
      ease: "power1.out",
      delay: 2,
    });
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    if (image) {
      image.classList.add("fade-in");
      const timeout = setTimeout(() => {
        image.classList.remove("fade-in");
      }, 1000); // Duration of the fade-in effect
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section className="carousel-container">
      <div className="carousel-background">
        <div className="carousel-image">
          <img ref={imageRef} src={imgArr[currentIndex]} alt="image" />
        </div>
      </div>
      <div ref={textRef} className="price_container">
        <div>
          <h2>Five fresh colours. Bold sound.</h2>
          <p>₹59900.00*</p>
        </div>
        <button>Buy Now</button>
      </div>
    </section>
  );
};

export default AirpodsMaxAnimation;
