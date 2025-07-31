import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import "./NewCollection.scss";

function NewCollection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="best-seller-section">
      <div className="container">
        <div className="best-seller-title">
          <h2>BEST SELLER</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            accumsan urna ligula, ut malesuada lorem rhoncus id.
          </p>
        </div>

        <div className="best-seller-product">
          {products.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className={`best-seller-card ${index === 2 ? "highlight" : ""}`}
            >
              <img
                src={`http://192.168.1.79:5000/${product.image1}`}
                alt={product.name}
              />
              {product.audio && (
                <div className="product-audio-wrapper">
                  <audio controls className="product-audio">
                    <source
                      src={`http://192.168.1.79:5000/${product.audio}`}
                      type="audio/mp3"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              {index === 2 && (
                <button className="add-to-cart-btn">🛒 Add to cart</button>
              )}
            </div>
          ))}
        </div>

        <div className="view-more">
          <button>
            View More <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCollection;
