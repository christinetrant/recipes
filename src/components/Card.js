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
    const recipe = this.props.recipe;
    const cardClass = 'card';
    return (
      <>
        <Tilt
          className='Tilt'
          options={{ max: 15, perspective: 800, scale: 1.1 }}
        >
          <div className='Tilt-inner'>
            <div className={cardClass}>
              <img
                className='card-img'
                alt='recipe'
                src={`https://robohash.org/${recipe.id}/set_set2/?size=200x200`}
              />
              <div className='card-content'>
                <h4 className='card-title'>{recipe.title}</h4>

                <Link
                  to={{
                    pathname: `/${recipe.title}`,
                    state: recipe
                  }}
                >
                  How to make{' '}
                  <FontAwesomeIcon className='card-icon' icon={faArrowRight} />
                </Link>

                <ul className='card-tags'>
                  {recipe.tags.map(tag => {
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
