// src/pages/Home.js
import Nav from "../containers/public/nav";
import About from "./about"; // Import component About
import { motion } from "framer-motion";
import { useRef } from "react";

function Home() {
  const aboutRef = useRef(null);
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); // Cuộn đến phần giới thiệu ngay đầu
  };

  return (
    <div>
      {/* navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>
      {/* home background */}
      <div
        className="min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 relative"
        style={{
          backgroundImage: "url(assets/img/home-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="w-full space-y-5 z-20 relative flex flex-col items-center">
          <h1
            className="text-primary font-semibold text-6xl text-center"
            style={{ lineHeight: "1.5", letterSpacing: "0.05em" }}
          >
            Thưởng thức hương vị Việt đậm đà trong không gian ấm cúng tại nhà
            hàng của chúng tôi.
          </h1>
          <button
            className="bg-accent opacity-80 text-white py-3 px-10 rounded-full font-semibold text-lg hover:bg-accent2 mt-5"
            onClick={scrollToAbout} // Khi bấm nút sẽ cuộn đến phần giới thiệu
          >
            Gọi món ngay
          </button>
        </div>
      </div>
      {/* about */}
      <motion.div
        ref={aboutRef} // Tham chiếu phần giới thiệu
        id="about"
        className="flex items-center justify-center relative z-30 pt-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <About />
      </motion.div>
    </div>
  );
}

export default Home;
