import "./AddToCart.scss";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddToCart = ({ productId, quantity }) => {
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    try {
      await api.post("/cart/add", {
        product_id: productId,
        quantity,
      });

      toast("Added to Cart", {
        description: "Would you like to view your cart?",
        icon: "🛍️",
        action: {
          label: "View Cart",
          onClick: () => {
            navigate("/cart");
          },
        },
      });
    } catch (error) {
      toast("Error!", {
        description: "Your item was not added to the cart.",
        icon: "⚠️",
        duration: 6000,
        style: {
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeeba",
          color: "#856404",
          padding: "12px 16px",
          borderRadius: "8px",
        },
      });
    }
  };

  return (
    <button className="add-to-cart-btn" onClick={handleAddToCart}>
      🛒 Add to cart
    </button>
  );
};

export default AddToCart;
