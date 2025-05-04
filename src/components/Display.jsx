import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBacon, 
  faCoffee, 
  faGlassWater, 
  faAppleAlt, 
  faHamburger, 
  faCookieBite, 
  faPizzaSlice, 
  faDrumstickBite, 
  faUtensils, 
  faFish, 
  faBone, 
  faCrown, 
  faWineGlassAlt, 
} from '@fortawesome/free-solid-svg-icons'; 

const Display = ({ menu }) => {
  const navigate = useNavigate();

  const handleClick = ({ category, items }) => {
    navigate(`/category/${category}`, { state: { category, items } });
  };

  
  const groupedMenu = menu.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  
  const categoryIcons = {
    'Full breakfast': <FontAwesomeIcon icon={faCoffee} />,
    breakfast: <FontAwesomeIcon icon={faBacon} />,
    'cold Beverages': <FontAwesomeIcon icon={faGlassWater} />,
    salads: <FontAwesomeIcon icon={faAppleAlt} />,
    sandwiches: <FontAwesomeIcon icon={faHamburger} />,
    snacks: <FontAwesomeIcon icon={faCookieBite} />,
    pizzas: <FontAwesomeIcon icon={faPizzaSlice} />,
    'Chicken Breast': <FontAwesomeIcon icon={faDrumstickBite} />,
    'Chicken Drumstick': <FontAwesomeIcon icon={faDrumstickBite} />,
    Accomponiment: <FontAwesomeIcon icon={faUtensils} />,
    Fish: <FontAwesomeIcon icon={faFish} />,
    Meat: <FontAwesomeIcon icon={faBone} />,
    pastries: <FontAwesomeIcon icon={faCrown} />,
    traditional: <FontAwesomeIcon icon={faWineGlassAlt} />,
  };

  return (
    <div className="menu-display">
      {Object.entries(groupedMenu).length === 0 ? (
        <p>No categories available</p>
      ) : (
        Object.entries(groupedMenu).map(([category, items]) => (
          <div
            key={category}
            onClick={() => handleClick({ category, items })}
            className="category-card"
          >
            <div className="category-icon">
              {categoryIcons[category] || <FontAwesomeIcon icon={faPizzaSlice} />} 
            </div>
            <h2 className="category-name">{category}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default Display;