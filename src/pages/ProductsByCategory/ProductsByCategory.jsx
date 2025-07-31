import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import "./ProductsByCategory.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useLocation } from "react-router-dom";

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const categoryName = location.state?.categoryName || "Category";
  const categoryImage = location.state?.categoryImage;
  console.log("name is :", categoryImage);

  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/products/category/${categoryId}`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="pbc-section">
      <div
        className="pbc-banner"
        style={{
          backgroundImage: `url(http://192.168.1.79:5000${categoryImage})`,
        }}
      >
        <div className="pbc-overlay" />
      </div>

      <div className="pbc-content">
        <div className="container">
          {/* <div className="pbc-header">
          <div className="pbc-heading-line">
            <h3 className="pbc-title">{categoryName}</h3>
            <div className="pbc-line"></div>
          </div>
        </div> */}

          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            <div className="pbc-list">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
