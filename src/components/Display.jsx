import React from 'react';

const Display = ({ menu }) => {
  
  const groupedByCategory = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      <h2>Our Menu</h2>
      {Object.entries(groupedByCategory).map(([category, items]) => {
        const hasSizes = items.some(item => item.priceSmall || item.priceMedium || item.priceLarge);

        return (
          <div key={category} className={`menu-section ${category.toLowerCase().replace(/\s+/g, '-')}`}>
            <h3>{category.toUpperCase()}</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  {hasSizes ? (
                    <>
                      <th>Small</th>
                      <th>Medium</th>
                      <th>Large</th>
                    </>
                  ) : (
                    <th>Price</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    {hasSizes ? (
                      <>
                        <td>{item.priceSmall ? `Ksh ${item.priceSmall}` : '-'}</td>
                        <td>{item.priceMedium ? `Ksh ${item.priceMedium}` : '-'}</td>
                        <td>{item.priceLarge ? `Ksh ${item.priceLarge}` : '-'}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Display;
