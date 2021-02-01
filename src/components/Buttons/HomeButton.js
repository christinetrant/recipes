// Import Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class HomeButton extends Component {
  render() {
    return (
      <Link to={'/'} className='card-link'>
        <FontAwesomeIcon className='card-icon' icon={faHome} />
        <span> Home</span>
      </Link>
    );
  }
}

export default HomeButton;
