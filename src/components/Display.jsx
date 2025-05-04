import React from 'react'
import { useNavigate } from 'react-router-dom';

const Display = ({menu}) => {
  const navigate = useNavigate()

  const handleClick = ({category,items}) => {
    navigate(`/category/${category}`,{state: {category,items}})
  }

  const groupedMenu = menu.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
    {Object.entries(groupedMenu).length === 0 ? (
      <p>No categories available</p>
    ) : (
      Object.entries(groupedMenu).map(([category, items]) => (
        <div
          key={category}
          onClick={() => handleClick({ category, items })}
          
        >
          <h2>{category}</h2>
        </div>
      ))
    )}
  </div>
  )
}

export default Display