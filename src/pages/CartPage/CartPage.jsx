import { useEffect, useState } from "react";
import api from "../../utils/axios";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        setCartItems(res.data);
      } catch (err) {
        console.error("Could not fetch cart", err);
      }
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      const res = await api.post("/orders/checkout");
      alert(
        `Order placed! Order ID: ${res.data.orderId} - Total: $${res.data.totalAmount}`
      );
      window.location.href = "/";
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Could not complete checkout. Please try again.");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <p>
              {item.name} - Quantity: {item.quantity}
            </p>
            <p>Price: ${item.price}</p>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </div>
  );
}

export default CartPage;
