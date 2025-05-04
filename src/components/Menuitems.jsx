import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MenuItems = ({addToCart}) => {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const { category, items: menu = []} = state || {}; 

  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size,
    }));
  };

  const handleBackToCategory = () => {
    navigate('/');
  }

  const getPriceBySize = (item, size) => {
    if (size === 'Small') return item.priceSmall;
    if (size === 'Medium') return item.priceMedium;
    if (size === 'Large') return item.priceLarge;
    return item.price;
  };

  if (!category || !menu.length) {
    return <p className="text-center text-gray-500 mt-10">No category data found.</p>;
  }

  return (
    <div>
      <button className="returnbtn" onClick={handleBackToCategory}>Back to category</button>
      <div className="menu-container">
        <h2 className="menu-title">Our Menu</h2>
        {menu.map((item) => {
          const hasSizeOptions = item.priceSmall || item.priceMedium || item.priceLarge;
          const selectedSize = selectedSizes[item.id] || 'Small';

          return (
            <div key={item.id} className="menu-item-card">
              <div className="card-header">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-item-image"
                    loading="lazy"
                  />
                )}
                <h4 className="menu-item-name">{item.name}</h4>
              </div>

              <div className="card-body">
                <div className="price-section">
                  {hasSizeOptions ? (
                    <div className="price-options">
                      <div className="price-option">
                        <span className="size-label">Small:</span>
                        <span className="price-value">{item.priceSmall ? `Ksh ${item.priceSmall}` : '-'}</span>
                      </div>
                      <div className="price-option">
                        <span className="size-label">Medium:</span>
                        <span className="price-value">{item.priceMedium ? `Ksh ${item.priceMedium}` : '-'}</span>
                      </div>
                      <div className="price-option">
                        <span className="size-label">Large:</span>
                        <span className="price-value">{item.priceLarge ? `Ksh ${item.priceLarge}` : '-'}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="single-price">
                      <span className="price-value">{item.price ? `Ksh ${item.price}` : '-'}</span>
                    </div>
                  )}
                </div>

                {item.details && (
                  <div className="description-section">
                    <ul className="menu-details-list">
                      {item.details.map((detail, id) => (
                        <li key={id} className="menu-detail-item">{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {hasSizeOptions && (
                  <div className="size-selector">
                    <label className="size-selector-label">Select Size</label>
                    <select
                      className="size-selector-dropdown"
                      value={selectedSize}
                      onChange={(e) => handleSizeChange(item.id, e.target.value)}
                    >
                      {item.priceSmall && <option value="Small">Small</option>}
                      {item.priceMedium && <option value="Medium">Medium</option>}
                      {item.priceLarge && <option value="Large">Large</option>}
                    </select>
                  </div>
                )}
              </div>

              <div className="card-footer">
                <button
                  className="add-to-cart-btn"
                  onClick={() =>
                    addToCart(
                      hasSizeOptions
                        ? {
                            id: `${item.id}-${selectedSize}`,
                            name: item.name,
                            size: selectedSize,
                            price: getPriceBySize(item, selectedSize),
                            image: item.image,
                            quantity: 1,
                          }
                        : {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: 1,
                          }
                    )
                  }
                >
                  Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuItems;