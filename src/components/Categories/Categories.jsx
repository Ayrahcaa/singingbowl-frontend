import { useEffect, useState } from "react";
import axios from "../../utils/axios";

function Categories() {
  const [categories, setCategories] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>SHOP BY CATEGORIES</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <h3>{cat.name}</h3>
            <p>{cat.description}</p>
            {cat.image && (
              <img
                src={`http://localhost:5000${cat.image}`}
                alt={cat.name}
                width="150"
              />
            )}
          </div>
        ))}
      </div>

      <hr style={{ margin: "40px 0" }} />
    </div>
  );
}

export default Categories;
