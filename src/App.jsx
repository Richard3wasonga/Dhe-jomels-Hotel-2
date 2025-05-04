import React,{useState,useEffect} from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Menu from './components/Menu'
import CheckoutPage from './components/CheckoutPage';
import MenuItems from './components/Menuitems';


const App = () => {

  const [menuInfo, setmenuInfo] = useState([])
  const [loading, setloading] = useState(true)
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

  if(loading) return <div className="loading-message">Loading menu...</div>

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Menu menu={menuInfo}/>
    },
    {
      path: '/checkout',
      element: <CheckoutPage />
    },
    {
      path: '/category/:categoryName',
      element: <MenuItems />
    }

  ])

  return (
    <RouterProvider router={router}/>
  
  )
}

export default App