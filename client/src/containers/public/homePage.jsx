import React, { useEffect, useRef } from 'react'
import { path } from '../../ultils/constant';
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import About from "./about";


const HomePage = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const location = useLocation();

  const handleGoToMenu = () => {
    navigate(path.MENU);
  };

  useEffect(() => {
    if (location.hash === "#about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className='w-full overflow-hidden'>
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
            onClick={handleGoToMenu}
          >
            Gọi món ngay
          </button>
        </div>
      </div>
      {/* about */}
      <motion.div
        ref={aboutRef}
        id="about"
        className="flex items-center justify-center relative z-30 pt-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <About />
      </motion.div>
    </div>
  )
}

export default HomePage