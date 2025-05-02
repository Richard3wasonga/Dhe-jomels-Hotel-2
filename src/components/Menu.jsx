import React,{useState,useEffect} from 'react'
import Display from './Display'
import MenuNav from './MenuNav'
import QrCodeComponent from './QrCodeComponent'

const Menu = ({menu}) => {

  const [filterBar, setfilterBar] = useState(false)
  const [cartBar, setcartBar] = useState(false)
  const [selectedCategory, setselectedCategory] = useState([])
  const [searchQuery, setsearchQuery] = useState('')
  const [cartItems, setcartItems] = useState([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCart) {
      setcartItems(storedCart)
    }
  }, []);

  const updateLocalStorageCart = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (item) => {
    const updatedCart = [...cartItems];
    const index = updatedCart.findIndex(i => i.id === item.id);

    if (index !== -1) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setcartItems(updatedCart);
    updateLocalStorageCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setcartItems(updatedCart);
    updateLocalStorageCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);

    setcartItems(updatedCart);
    updateLocalStorageCart(updatedCart);
  }

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setcartItems(updatedCart)
    updateLocalStorageCart(updatedCart)
  }

  const totalCost = parseFloat(
     cartItems.reduce((sum, item) => {
    const price = item.price || item.priceSmall || item.priceMedium || item.priceLarge || 0;
    return sum + price * item.quantity;
  }, 0).toFixed(2)
)

 
  const toggleFilterBar = () => {
      setfilterBar(prev => !prev)

  }
  const toggleCartBar = () => {
    setcartBar(prev => !prev)
  }

  const handleCategoryChange = (category) => {
      setselectedCategory(prev => 
          prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      )
  }

  const categories = [...new Set(menu.map(item => item.category))]

  const filteredItem = menu.filter(item => {
      const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(item.category);
      const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
      return matchesCategory && matchesSearchQuery;
    });

  return (
    <div>
      <MenuNav toggleFilterBar={toggleFilterBar} toggleCartBar={toggleCartBar} searchQuery={searchQuery} setsearchQuery={setsearchQuery}/>
      <div className={`sidebar ${filterBar ? 'show' : 'hide'}`}>
            <h2>Filter menu</h2>
            {categories.map((category,id) => (
                <label key={id}>
                    <input
                        type='checkbox'
                        checked={selectedCategory.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                </label>
            ))}
            <button onClick={toggleFilterBar}>Close</button>
        </div>
        <div className={`sidecart ${cartBar ? 'showcart' : 'hidecart'}`}>
  <h2>Your Cart</h2>
  
  {cartItems.length === 0 ? (
    <p>Your cart is empty</p>
  ) : (
    <ul>
      {cartItems.map((item) => {
        const price = item.price || item.priceSmall || item.priceMedium || item.priceLarge || 0;
        return (
          <li key={item.id}>
            <div>
              <strong>{item.name}</strong><br />
              <div>
                <button className='decrement-btn' onClick={() => decreaseQuantity(item.id)}>-</button>
                <small>Qty: {item.quantity}</small>
                <button className='increment-btn' onClick={() => increaseQuantity(item.id)}>+</button>

              </div>
              
            </div>
            <div>
              <p>KSH {price * item.quantity}</p>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          </li>
        );
      })}
    </ul>
  )}

  <div className="cart-bottom">
    <p className="total-cost">Total: KSH {totalCost}</p>
    <div className="cart-buttons">
      <button className="remove-btn" onClick={() => {
        setcartItems([]);
        updateLocalStorageCart([]);
      }} disabled={cartItems.length === 0}>Clear</button>
      <button className="checkout-btn" disabled={cartItems.length === 0}>Checkout</button>
      <button className="close-cart-btn" onClick={toggleCartBar}>Close</button>
    </div>
  </div>
</div>
      <Display menu={filteredItem} addToCart={addToCart}/>
      <QrCodeComponent />
    </div>
  )
}

export default Menu