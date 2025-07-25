import { motion } from "framer-motion";
import "./HeroSection.scss";
import backgroundImage from "../Assets/images/heroimg1.webp";

const Hero = () => {
  return (
    <div className="hero-section">
      <div
        className="hero-image"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="hero-overlay" />
        {/* <div className="hero-text container text-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.99, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h5>WELCOME TO</h5>
            <div className="horizontal-line"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2>ARON</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>ENGINEERING</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -61 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.99 }}
            viewport={{ once: true }}
          >
            <h4>“Where Ideas Take Shape”</h4>
          </motion.div>
        </div> */}
      </div>

      <div className="white-container">
        <div className="inner-container"></div>
      </div>
    </div>
  );
};

export default Hero;
