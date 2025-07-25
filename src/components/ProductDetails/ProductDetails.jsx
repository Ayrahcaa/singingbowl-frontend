import { useEffect, useState } from "react";
import axios from "../../utils/axios";

function ProductDetails() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes] = await Promise.all([axios.get("/products")]);

        setProducts(prodRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              maxWidth: "300px",
            }}
          >
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Weight: {product.weight} kg</p>
            <p>Stock: {product.stock}</p>
            <p>Description: {product.description}</p>
            <p>Popular: {product.popularity ? "Yes" : "No"}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[1, 2, 3, 4, 5].map((i) => {
                const imagePath = product[`image${i}`];
                return (
                  imagePath && (
                    <img
                      key={i}
                      src={`http://localhost:5000/${imagePath}`}
                      alt={`${product.name} ${i}`}
                      width="80"
                    />
                  )
                );
              })}
            </div>

            {product.audio && (
              <div style={{ marginTop: "10px" }}>
                <p>Listen:</p>
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
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
