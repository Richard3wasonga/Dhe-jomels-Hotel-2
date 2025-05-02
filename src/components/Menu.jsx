import React,{useState} from 'react'
import Display from './Display'
import MenuNav from './MenuNav'

const Menu = ({menu}) => {

  const [filterBar, setfilterBar] = useState(false)
  const [selectedCategory, setselectedCategory] = useState([])
  const [searchQuery, setsearchQuery] = useState('')

  const toggleFilterBar = () => {
      setfilterBar(prev => !prev)

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
      <MenuNav toggleFilterBar={toggleFilterBar} searchQuery={searchQuery} setsearchQuery={setsearchQuery}/>
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
      <Display menu={filteredItem}/>
    </div>
  )
}

export default Menu