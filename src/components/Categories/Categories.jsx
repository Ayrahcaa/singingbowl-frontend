import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import "./Categories.scss";
import axios from "../../utils/axios";

function Categories() {
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
    <div className="category-container">
      <div className="container">
        <h2 className="category-title">SHOP BY CATEGORY</h2>
        <div className="category-list">
          {categories.map((cat) => (
            <div
              className="category-card"
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className="c-img">
                {cat.image && (
                  <img
                    src={`http://192.168.1.79:5000${cat.image}`}
                    alt={cat.name}
                    className="category-image"
                  />
                )}
              </div>

              <h3 className="category-name">{cat.name}</h3>
            </div>
          ))}
        </div>
        <hr className="category-divider" />
      </div>
    </div>
  );
}

export default Categories;
