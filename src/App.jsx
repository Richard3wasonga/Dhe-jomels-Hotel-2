import React,{useState,useEffect} from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Menu from './components/Menu'
import CheckoutPage from './components/CheckoutPage';
import MenuItems from './components/Menuitems';


const App = () => {

  const [menuInfo, setmenuInfo] = useState([])
  const [loading, setloading] = useState(true)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const fetchMenu = async () => {
      try{
        const response = await fetch('https://jomels-menu.vercel.app/menu');
        const data = await response.json();
        setmenuInfo(data);
      
      }catch (error){
        console.error('Oops error fetching menu:', error)
      }finally{
        setTimeout(() => {
          setloading(false)
        },1000)
      }

    }
    fetchMenu()
  }, [])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  const updateLocalStorageCart = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const updatedCart = [...prevCartItems];
      const index = updatedCart.findIndex(i => i.id === item.id);
  
      if (index !== -1) {
        updatedCart[index].quantity += 1;
      } else {
        updatedCart.push({ ...item, quantity: 1 });
      }
  
      updateLocalStorageCart(updatedCart);
      return updatedCart;
    });
  };


  if(loading) return <div className="loading-message">Loading menu...</div>

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Menu menu={menuInfo} addToCart={addToCart}/>
    },
    {
      path: '/checkout',
      element: <CheckoutPage />
    },
    {
      path: '/category/:categoryName',
      element: <MenuItems addToCart={addToCart}/>
    }

  ])

  return (
    <RouterProvider router={router}/>
  
  )
}

export default App