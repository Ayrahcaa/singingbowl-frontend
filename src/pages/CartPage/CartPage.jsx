import { useEffect, useState } from "react";
import api from "../../utils/axios";
import "./CartPage.scss";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCartItems(res.data);
    } catch (err) {
      console.error("Could not fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.error("Could not remove item:", err);
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await api.put(`/cart/${id}`, { quantity });
      fetchCart();
    } catch (err) {
      console.error("Could not update quantity:", err);
    }
  };

  const getSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-page-container">
      <div className="container">
        <h2>Your Shopping Cart</h2>
        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-column">
              {cartItems.map((item) => (
                <div>
                  <div
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    ✕
                  </div>

                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img
                        src={`http://localhost:5000/${item.image1}`}
                        alt={item.name}
                      />
                    </div>

                    <div className="item-details">
                      <h4>{item.name}</h4>

                      {/* <p>{item.weight}</p> */}

                      <p className="item-ref">Ref. {item.ref}</p>
                    </div>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="item-price">
                      $ {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}

              <div className="subtotal">
                Subtotal: <strong>$ {getSubtotal()}</strong>
              </div>
            </div>

            <div className="cart-summary">
              <h3>CART TOTALS</h3>
              <div className="summary-line">
                <span>Shipping (3–5 Business Days)</span>
                <span>Free</span>
              </div>
              <div className="summary-line">
                <span>TAX (estimated)</span>
                <span>$0</span>
              </div>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>$ {getSubtotal()}</span>
              </div>
              <hr />
              <div className="summary-line total">
                <span>Total</span>
                <span>$ {getSubtotal()}</span>
              </div>
              <button className="checkout-btn">PROCEED TO CHECKOUT</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
