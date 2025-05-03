import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
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

  const handleCompleteOrder = () => {
    setShowPaymentForm(true);
  };

  const handleSubmitPayment = () => {
    if (paymentMethod === '') {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === 'mpesa') {
      alert('Proceeding with Mpesa payment...');
    } else {
      alert('Order confirmed for Pay on Delivery!');
    }

    
    localStorage.removeItem('cartItems');
    navigate('/');
  };

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
            <button onClick={handleCompleteOrder}>Complete Order</button>
          </div>
          {showPaymentForm && (
           <div className="payment-form">
           <h3>Select Payment Method</h3>
           <label className="payment-option">
             <input
               type="radio"
               value="delivery"
               checked={paymentMethod === 'delivery'}
               onChange={(e) => setPaymentMethod(e.target.value)}
             />
             <span>Pay on Delivery</span>
           </label>
           <label className="payment-option">
             <input
               type="radio"
               value="mpesa"
               checked={paymentMethod === 'mpesa'}
               onChange={(e) => setPaymentMethod(e.target.value)}
             />
             <span>Mpesa</span>
           </label>
           <button onClick={handleSubmitPayment}>Submit Payment</button>
         </div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutPage;