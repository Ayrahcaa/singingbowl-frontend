import { useEffect, useState } from "react";
import api from "../../utils/axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ marginBottom: "2rem" }}>
            <h4>Order #{order.id}</h4>
            <p>Date: {new Date(order.created_at).toLocaleString()}</p>
            <p>Total: ${order.total_amount}</p>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
