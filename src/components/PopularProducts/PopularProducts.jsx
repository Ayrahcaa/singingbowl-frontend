// import { useEffect, useState } from "react";
// import axios from "../../utils/axios";

// const PopularProducts = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [catRes] = await Promise.all([axios.get("/categories")]);
//         setCategories(catRes.data);
//       } catch (err) {
//         console.error("Failed to fetch data:", err);
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <div>
//       {categories.map((cat) => (
//         <div key={cat.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
//           <h3>{cat.name}</h3>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PopularProducts;

import { useEffect, useState } from "react";
import axios from "../../utils/axios";

const PopularProducts = () => {
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
    <div className="popular-products-container" style={{ padding: "20px" }}>
      {categories.map((cat) => {
        const filteredProducts = products.filter(
          (product) => product.category_id === cat.id
        );

        return (
          <div
            key={cat.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#333" }}>{cat.name}</h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "10px",
                      width: "200px",
                    }}
                  >
                    <img
                      src={`http://localhost:5000/${product.image1}`}
                      width="80"
                    />
                    <h5>{product.name}</h5>
                    <p>Price: ${product.price}</p>
                  </div>
                ))
              ) : (
                <p style={{ color: "#888" }}>
                  No products found in this category.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PopularProducts;
