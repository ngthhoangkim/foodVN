import Nav from "../components/nav";
import About from "./about";
import { motion } from "motion/react";

function Home() {
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
            className="text-[#FABC3F] font-semibold text-6xl text-center"
            style={{ lineHeight: "1.5", letterSpacing: "0.05em" }}
          >
            Thưởng thức hương vị Việt đậm đà trong không gian ấm cúng tại nhà
            hàng của chúng tôi.
          </h1>
          <button className="bg-[#C7253E] opacity-80 text-white py-3 px-10 rounded-full font-semibold text-lg hover:bg-[#FF6969] mt-5">
            Gọi món ngay
          </button>
        </div>
      </div>
      {/* about */}
      <motion.div
        id="about"
        className="my-8 flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }} // Bắt đầu thấp một chút (50px)
        whileInView={{ opacity: 1, y: 0 }} // Hoạt ảnh tới vị trí bình thường
        transition={{ duration: 0.5 }}
        viewport={{ once: true }} // Chỉ kích hoạt một lần khi vào tầm nhìn
      >
        <About />
      </motion.div>
    </div>
  );
}

export default Home;
