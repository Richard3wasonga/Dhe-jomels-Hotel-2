import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter,faCartShopping } from '@fortawesome/free-solid-svg-icons'

const MenuNav = ({ toggleFilterBar, setsearchQuery, searchQuery,toggleCartBar }) => {
  return (
    <div className="menu-nav">
        <div className="menu-nav-top" >
            <button onClick={toggleFilterBar} className="filter-button"><FontAwesomeIcon icon={faFilter} /> Filter</button>
            <div className="hotel-branding">
                <span className="hotel-title">DHE JOMELS</span>
                <span className="hotel-subtitle">HOTEL</span>
            </div>
            <button onClick={toggleCartBar} className="cart-button"><FontAwesomeIcon icon={faCartShopping} /> Cart</button>
        </div>
        <div className="menu-nav-search">
            <input
                type="text"
                placeholder="Search for a dish..."
                value={searchQuery}
                onChange={(e) => setsearchQuery(e.target.value)}
                className="menu-search"
            />
        </div>
    </div>
  )
}

export default MenuNav