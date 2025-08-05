import { useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCardClick = () => {
    const slug = slugify(product.name, { lower: true });
    navigate(`/product/${slug}`, {
      state: {
        productName: product.name,
        productId: product.id,
        productImage: product.image,
      },
    });
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="image-wrapper">
        {loading && <div className="spinner">Loading…</div>}
        <img
          src={`http://192.168.1.79:5000/${product.image1}`}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onLoad={(e) => {
            e.target.style.opacity = 1;
            setLoading(false);
          }}
        />
      </div>
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
      <h4 className="product-name">{product.name}</h4>
      <p className="product-price">${product.price}</p>
      <button className="add-to-cart-btn">🛒 Add to cart</button>
    </div>
  );
};

export default ProductCard;
