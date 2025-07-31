import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import slugify from "slugify";
import "./PopularProducts.scss";
import ProductCard from "../ProductCard/ProductCard";

const PopularProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get("/categories"),
          axios.get("/products"),
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
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
    <div className="popular-products-section">
      <div className="container">
        {categories.map((cat) => {
          const filteredProducts = products.filter(
            (product) => product.category_id === cat.id
          );

          return (
            filteredProducts.length > 0 && (
              <div key={cat.id} className="popular-category-wrapper">
                <div className="featured-header">
                  <div className="section-heading-line">
                    <h3 className="section-title">{cat.name}</h3>
                    <div className="section-line"></div>
                  </div>
                  <button
                    className="view-more-btn"
                    onClick={() => handleCategoryClick(cat)}
                  >
                    View More <span>→</span>
                  </button>
                </div>

                <div className="product-list">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default PopularProducts;
