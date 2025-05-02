import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  const totalCost = cartItems.reduce((sum, item) => {
    const price = item.price || item.priceSmall || item.priceMedium || item.priceLarge || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')}>Back to Menu</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Price: KSH {(
                    (item.price || item.priceSmall || item.priceMedium || item.priceLarge || 0) * 
                    item.quantity
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="checkout-summary">
            <h3>Total: KSH {totalCost.toFixed(2)}</h3>
            <button onClick={() => navigate('/')}>Back to Menu</button>
            <button>Complete Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;