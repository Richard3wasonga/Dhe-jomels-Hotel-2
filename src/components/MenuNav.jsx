import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter,faCartShopping } from '@fortawesome/free-solid-svg-icons'

const MenuNav = ({ toggleFilterBar, setsearchQuery, searchQuery }) => {
  return (
    <div>
        <div>
            <button onClick={toggleFilterBar} className="filter-button"><FontAwesomeIcon icon={faFilter} /></button>
            <div>
                <span className="hotel-title">DHE JOMELS</span>
                <span className="hotel-subtitle">HOTEL</span>
            </div>
            <button><FontAwesomeIcon icon={faCartShopping} /></button>
        </div>
        <div>
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