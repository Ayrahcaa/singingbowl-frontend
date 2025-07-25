import { useEffect, useState } from "react";
import axios from "../../utils/axios";

function NewCollection() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>SHOP OUR LATEST ADDITION</h2>
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
            <img src={`http://localhost:5000/${product.image1}`} width="80" />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            {product.audio && (
              <div style={{ marginTop: "10px" }}>
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

export default NewCollection;
