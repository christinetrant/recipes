import React, { Component, Router } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Tilt from 'react-tilt';
import { Link } from 'react-router-dom';
import CardInfo from './CardInfo';

// const Card = (props) => {
// const Card = ({ title, category, id }) => {
class Card extends Component {
  constructor(props) {
    super(props);
  }
  // destructuring but we can put below in parameter above instead of props
  // const { name, email, id } = props

  render() {
    // const cardClass = ['card', this.checkCategory()].join(' ')
    const cardClass = 'card';
    return (
      <>
        <Tilt className='Tilt' options={{ max: 25 }}>
          <div className='Tilt-inner'>
            <div className={cardClass}>
              <img
                className='card-img'
                alt='recipe'
                src={`https://robohash.org/${this.props.id}/set_set2/?size=200x200`}
              />
              <div className='card-content'>
                <h4 className='card-title'>{this.props.title}</h4>
                {/* <h4>{this.props.id}</h4> */}

                <a href=''>
                  How to make{' '}
                  <FontAwesomeIcon className='card-icon' icon={faArrowRight} />
                </a>

                <Link to='/card'>test</Link>

                {/* <ul className='card-tags'>
            <li>{this.props.category}</li>
          </ul> */}
                <ul className='card-tags'>
                  {this.props.tags.map(tag => {
                    const classTags = tag.split(' ').join('');
                    return (
                      <li className={classTags} key={tag}>
                        {tag}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Tilt>
      </>
    );
  }
}

export default Card;
