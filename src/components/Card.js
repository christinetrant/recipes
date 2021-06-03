// Import Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Import External Components
import Tilt from 'react-tilt';
// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
      recipe: this.props.recipe
    }
	}
	// destructuring but we can put below in parameter above instead of props
	render() {
		console.log("props", this.props, this.state);
		// this.setState({ recipe:  });
		// this.state = this.props;
		// const { recipe } = this.state;
		// const { recipe_id, recipe_name, recipe_tag } = this.state.recipe;
		console.log("statattatata", this.state);
		// We save tags into db as an array so we split now to show on card:
		const tags = this.state.recipe.recipe_tag.split(";;;");
		const cardClass = "card";

		return (
			<>
				<Tilt
					className='Tilt'
					options={{ max: 15, perspective: 800, scale: 1.1 }}
				>
					<div className='Tilt-inner'>
						<Link
							to={{
								pathname: `/${this.state.recipe.recipe_id}`,
								state: {           recipe: this.state.recipe           },
							}}
							className='card-link-wrapper'
						>
							<div className={cardClass}>
								{/* <img
                  className='card-img'
                  alt='recipe'
                  src={`https://robohash.org/${recipe.id}/set_set2/?size=200x200`}
                /> */}

								<img
									className='card-img'
									alt={this.state.recipe.recipe_name}
									// src={this.state.recipe.recipe.image}
								/>

								{/* <a href='https://www.freepik.com/vectors/background'>Background vector created by rawpixel.com - www.freepik.com</a> */}

								<div className='card-content'>
									<h4 className='card-title'>
										
										
										
										
										
										
										
										
										
										
										{this.state.recipe.recipe_name}
									</h4>

									<div className='card-content-inner'>
										<p className='card-recipe-link'>
											How to make{" "}
											<FontAwesomeIcon
												className='card-icon'
												icon={faArrowRight}
											/>
										</p>
										<ul className='card-tags'>
											{tags.map((tag) => {
												const colors = [
													"purple",
													"yellow",
													"orange",
													"pink",
													"green",
													"blue",
												];
												let tagColor =
													colors[Math.floor(Math.random() * colors.length)];
												return (
													<li className={tagColor} key={tag}>
														{tag}
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							</div>
						</Link>
					</div>
				</Tilt>
			</>
		);
	}
}

export default Card;
