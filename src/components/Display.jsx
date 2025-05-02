import React, { useState } from 'react';

const Display = ({ menu, addToCart }) => {
  const [selectedSizes, setSelectedSizes] = useState({});

  const groupedByCategory = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size,
    }));
  };

  const getPriceBySize = (item, size) => {
    if (size === 'Small') return item.priceSmall;
    if (size === 'Medium') return item.priceMedium;
    if (size === 'Large') return item.priceLarge;
    return item.price;
  };

  return (
    <div>
      <h2>Our Menu</h2>
      {Object.entries(groupedByCategory).map(([category, items]) => {
        const hasSizes = items.some(item => item.priceSmall || item.priceMedium || item.priceLarge);

        return (
          <div key={category} className={`menu-section ${category.toLowerCase().replace(/\s+/g, '-')}`}>
            <h3 className='category-title'>{category.toUpperCase()}</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  {hasSizes ? (
                    <>
                      <th>Small</th>
                      <th>Medium</th>
                      <th>Large</th>
                      <th>Select Size</th>
                    </>
                  ) : (
                    <th>Price</th>
                  )}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const hasSizeOptions = item.priceSmall || item.priceMedium || item.priceLarge;
                  const selectedSize = selectedSizes[item.id] || 'Small';

                  return (
                    <tr key={index}>
                      <td className='category-name'>{item.name}</td>
                      {hasSizeOptions ? (
                        <>
                          <td>{item.priceSmall ? `Ksh ${item.priceSmall}` : '-'}</td>
                          <td>{item.priceMedium ? `Ksh ${item.priceMedium}` : '-'}</td>
                          <td>{item.priceLarge ? `Ksh ${item.priceLarge}` : '-'}</td>
                          <td>
                            <select
                              value={selectedSize}
                              onChange={(e) => handleSizeChange(item.id, e.target.value)}
                            >
                              {item.priceSmall && <option value="Small">Small</option>}
                              {item.priceMedium && <option value="Medium">Medium</option>}
                              {item.priceLarge && <option value="Large">Large</option>}
                            </select>
                          </td>
                        </>
                      ) : (
                        <td>{item.price ? `Ksh ${item.price}` : '-'}</td>
                      )}
                      {item.details && (
                        <td>
                          <ul className="menu-details">
                            {item.details.map((detail, id) => (
                              <li key={id}>{detail}</li>
                            ))}
                          </ul>
                        </td>
                      )}
                      <td>
                        <button
                          onClick={() =>
                            addToCart(
                              hasSizeOptions
                                ? {
                                    id: `${item.id}-${selectedSize}`,
                                    name: item.name,
                                    size: selectedSize,
                                    price: getPriceBySize(item, selectedSize),
                                    quantity: 1,
                                  }
                                : {
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    quantity: 1,
                                  }
                            )
                          }
                        >
                          Order
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Display;