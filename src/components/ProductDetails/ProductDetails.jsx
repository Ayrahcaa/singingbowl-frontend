import "./ProductDetails.scss";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useLocation } from "react-router-dom";
import bannerimg from "../Assets/images/heroimg1.webp";
import AddToCart from "../Button-AddToCart/AddToCart";
import { toast } from "sonner";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const productId = location.state?.productId;

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        toast.error("Out of stock!");
      }
    };
    fetchProduct();
  }, [productId]);

  const [mainImageIndex, setMainImageIndex] = useState(0);

  if (!product) return <p>Loading product...</p>;

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ].filter(Boolean);

  return (
    <div className="product-details">
      <div className="pd-banner">
        <div
          className="pd-banner-image"
          style={{ backgroundImage: `url(${bannerimg})` }}
        >
          <div className="pd-overlay" />
          <div className="pd-breadcrumbs">Home / Shop / Product Details</div>
        </div>
      </div>

      <div className="container">
        <div className="pd-product-container">
          <div className="pd-product-images-carousel">
            <div className="carousel-main">
              <button
                className="carousel-arrow left"
                onClick={() =>
                  setMainImageIndex(
                    (prev) => (prev - 1 + images.length) % images.length
                  )
                }
              >
                &#8592;
              </button>

              <img
                className="main-carousel-image"
                src={`http://localhost:5000/${images[mainImageIndex]}`}
                alt={product.name}
              />

              <button
                className="carousel-arrow right"
                onClick={() =>
                  setMainImageIndex((prev) => (prev + 1) % images.length)
                }
              >
                &#8594;
              </button>
            </div>

            <div className="carousel-thumbnails">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumbnail-container ${
                    idx === mainImageIndex ? "active" : ""
                  }`}
                  onClick={() => setMainImageIndex(idx)}
                >
                  <img
                    src={`http://localhost:5000/${img}`}
                    alt={`Thumbnail ${idx}`}
                    className="thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pd-product-info">
            <p className="pd-category">{product.category_name}</p>

            <div className="pd-instock">
              <h1 className="pd-name">{product.name}</h1>
              <span
                className={`stock-status ${
                  product.stock > 0 ? "in-stock" : "out-of-stock"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="pd-rating">
              ⭐ 4.8 <span>(245 Review)</span>
            </div>

            <div className="pd-price">
              <span className="discounted">${product.price}</span>
            </div>

            <div className="pd-volume-options">
              Available size:
              <button className="volume-btn">{product.weight} Kg</button>
            </div>

            <div className="pd-cart-controls">
              <div className="pd-qty">
                <button className="qty-btn" onClick={handleDecrease}>
                  −
                </button>

                <div className="qty-value">{quantity}</div>

                <button className="qty-btn" onClick={handleIncrease}>
                  +
                </button>
              </div>
              <AddToCart productId={product.id} quantity={quantity} />
            </div>

            {/* <div className="tags">
              Tags: {product.tags?.join(", ") || "Skincare, Serums"}
            </div> */}

            {product.audio && (
              <div className="audio-player">
                <p>Play the Soothing Tone</p>
                <audio controls>
                  <source
                    src={`http://localhost:5000/${product.audio}`}
                    type="audio/mp3"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </div>

        <div className="pd-description-section">
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
