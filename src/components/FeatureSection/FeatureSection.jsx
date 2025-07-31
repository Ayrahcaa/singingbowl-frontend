import "./FeatureSection.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import slugify from "slugify";
import featureImg from "../Assets/images/bowl6-removebg.png";

const FeatureSection = () => {
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
    <section className="feature-section">
      <div className="feature-inside container">
        <div className="feature-left">
          <h2 className="feature-title">
            Handcrafted Harmony
            <br />
            for Inner Healing
          </h2>

          <p className="feature-description">
            Explore the soul-soothing world of Tibetan sound healing with our
            authentic instruments. Handcrafted by artisans, each piece from
            singing bowls to gongs are designed to enhance meditation,
            mindfulness, and sacred rituals.
          </p>

          <div className="feature-stats">
            <div className="stat-box">
              <h3>100%</h3>
              <p>Satisfaction rate</p>
            </div>
            <div className="divider"></div>
            <div className="stat-box">
              <h3>200+</h3>
              <p>Authentic Items</p>
            </div>
          </div>

          <button className="explore-button">Explore Product</button>
        </div>

        <div className="feature-right">
          <div className="arrow-circle">
            {/* <FaArrowDownRight className="arrow-icon" /> */}
          </div>
          <div className="feature-image-wrapper">
            <img
              src={featureImg}
              alt="Singing Bowl Top View"
              className="feature-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
