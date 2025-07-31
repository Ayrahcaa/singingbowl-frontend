import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import slugify from "slugify";
import "./HeroSection.scss";
import shape1 from "../Assets/images/shape2.png";
import bowlimage from "../Assets/images/bowl2-removebg.png";
import thumb1 from "../Assets/images/bowl5-removebg.png";
import thumb2 from "../Assets/images/bowl6-removebg.png";

const Hero = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes] = await Promise.all([axios.get("/categories")]);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (cat) => {
    const slug = slugify(cat.name, { lower: true });
    navigate(`/category/${slug}`, {
      state: {
        categoryName: cat.name,
        categoryId: cat.id,
        categoryImage: cat.image,
      },
    });
  };

  return (
    <div className="hero-section">
      <div className="container">
        <div className="background-shape">
          <img className="bgshape1" src={shape1} alt="rectangular shape" />
        </div>

        <div className="hero-content-top">
          <h1 className="hero-title">
            Sacred Sound
            <br />
            Timeless Craft
          </h1>

          <p className="hero-description">
            Experience the sound of serenity. Our handcrafted <br /> Tibetan
            instruments are rooted in ancient tradition <br /> and crafted to
            elevate your space and spirit.
          </p>
        </div>

        <div className="hero-content-bottom">
          <div className="hero-left">
            {/* <ul className="hero-category-list">
              <li>Praying Flag</li>
              <li>Thangka</li>
              <li className="active">Singing Bowl</li>
              <li>Bajra</li>
              <li>Gong</li>
            </ul> */}

            <button
              className="explore-btn"
              onClick={() => {
                const category = categories.find(
                  (c) => c.name === "Tibetian Singing bowl"
                );
                if (category) handleCategoryClick(category);
              }}
            >
              Explore Product
            </button>
          </div>

          <div className="hero-center">
            <img src={bowlimage} alt="Singing Bowl" className="main-bowl" />
          </div>

          <div className="hero-right">
            <div className="thumbnail-group">
              <div className="arrow-circle">
                <span className="arrow-icon">↓</span>
              </div>
              <img src={thumb1} alt="Chair Thumb 1" className="thumbnail" />
              <img src={thumb2} alt="Chair Thumb 2" className="thumbnail" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
