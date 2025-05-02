import React,{useState,useEffect} from 'react'
import Menu from './components/Menu'


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

  return (
    <div>
      <Menu menu={menuInfo}/>
    </div>
  )
}

export default App