import "./App.css"; // Create and import your CSS styles
import AirpodsMaxAnimation from "./component/AirpodsMaxAnimation";
import AirpodsAnimation from "./component/AirpordsAnimation";
import SliderAnimation from "./component/SliderAnimation";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ScrollSections from "./component/Slider";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <div className="scroll-container">
      <ScrollSections />
      <section>
        <AirpodsAnimation />
      </section>
      <section>
        <AirpodsMaxAnimation />
      </section>
    </div>
  );
};

export default App;
