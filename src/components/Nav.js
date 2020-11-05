// Import Core
import React, { Component } from 'react';
// Import Components
import SearchBox from '../components/SearchBox';
// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faAppleAlt, faHamburger, faIceCream, faCookie, faGlassMartiniAlt } from '@fortawesome/free-solid-svg-icons';

class Nav extends Component {
  constructor(props) {
    super(props)
  }

  renderNav() {
    return (
      <div className='nav'>
        <SearchBox searchChange={this.props.onSearchChange} />
        <nav className='filter-categories'>    
          <div className="nav-item">
            <button
              className='nav-button' 
              onClick={() => this.props.onFilterChange('all')}
            >
              <FontAwesomeIcon className='nav-icon' icon={faUtensils} />
            </button>
            <span>All</span>
          </div>

          <div className="nav-item">
            <button
              className='nav-button' 
              onClick={() => this.onFilterChange('breakfast')}
            >
              <FontAwesomeIcon className='nav-icon' icon={faAppleAlt} />
            </button>
            <span>Breakfast</span>
          </div>

          <div className="nav-item">
            <button
              className='nav-button' 
              onClick={() => this.onFilterChange('main')}
            >
              <FontAwesomeIcon className='nav-icon' icon={faHamburger} />
            </button>
            <span>Main</span>
          </div>

          <div className="nav-item">
            <button
              className='nav-button' 
              onClick={() => this.onFilterChange('dessert')}
            >
              <FontAwesomeIcon className='nav-icon' icon={faIceCream} />
            </button>
            <span>Dessert</span>
          </div>

          <div className="nav-item">
            <button
              className='nav-button' 
              onClick={() => this.onFilterChange('snacks')}
            >
              <FontAwesomeIcon className='nav-icon' icon={faCookie} />
            </button>
            <span>Snacks</span>
          </div>

          <div className="nav-item">
            <button
              className='nav-button' 
              onClick={() => this.onFilterChange('drinks')}>
              <FontAwesomeIcon className='nav-icon' icon={faGlassMartiniAlt} />
            </button>
            <span>Drinks</span>
          </div>
        </nav>
      </div>  
    )
  }

  render() {
    return (
      this.renderNav()
    )
  }
}

export default Nav;