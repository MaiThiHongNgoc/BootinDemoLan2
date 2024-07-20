// CartSidebar.js
import React from 'react';
import './CartSidebar.css';

const CartSidebar = ({ cartItems, onClose }) => {
  return (
    <div className="cart-sidebar">
      <button className="close-btn" onClick={onClose}>X</button>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartSidebar;
