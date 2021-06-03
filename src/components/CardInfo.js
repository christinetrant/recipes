// Import Core
import React, { Component } from "react";
import { Link, Switch, BrowserRouter as Router, Route } from "react-router-dom";
// Import Components
import HomeButton from "./Buttons/HomeButton";
import EditRecipe from "./EditRecipe";
import AddRecipe from "./AddRecipe";
// Import Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleRight,
	faUtensils,
	faFire,
} from "@fortawesome/free-solid-svg-icons";

class CardInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipe: this.props.location.state.recipe,
		};
	}
	render() {
		// this.state = this.props.location.state.recipe
		const {
			recipe_id,
			recipe_name,
			recipe_author,
			recipe_serves,
			recipe_calories,
			recipe_url,
			recipe_tag,
			recipe_ingredients,
			recipe_method,
		} = this.state.recipe;
		console.log("cardInfo", this.state.recipe);
		// console.log('booooo',this.state);
		const tags = recipe_tag.split(";;;");
		const ingredients = recipe_ingredients.split(";;;");
		const method = recipe_method.split(";;;");
		// console.log('test', this.props.location);

		return (
			<>
				<HomeButton />
				<div className='bg'>
					<div className='card-list'>
						<div className='card-details'>
							<div className='card-btn-group'>
								{/* <button
									className='card-button btn'
									onClick={() => this.props.editRecipe(recipe_id)}
								>
									Edit
								</button> */}
								{/* <Link to='/edit' > */}
								<Link to={{ pathname: "/edit", state: {recipe: this.state} }}>
								<button
									className='card-button btn'
									onClick={() => this.props.editRecipe(recipe_id)}
								>
									Edi
								</button>
								</Link>
								{/* <Router>
  <Switch>
                <Route
								path='/:id/edit'
								render={(props) => (
									<AddRecipe
										getRecipes={this.getRecipes}
										editRecipe={this.editRecipe}
										{...props}
									/>
								)}
							/>
						</Switch>
					</Router> */}
								{/* {console.log("th", this.state, this.props)} */}
								{/* <Link to={{ pathname: `/${this.state.recipe.recipe_id}/edit` }}>
									<EditRecipe />
								</Link> */}

{/* <Link to="/edit" className="btn">hello</Link> */}


								<Link to={{ pathname: "/" }}>
									<button
										className='card-button btn'
										onClick={() => this.props.deleteRecipes(recipe_id)}
									>
										Delete
									</button>
								</Link>
							</div>
							<h4 className='card-title'>{recipe_name}</h4>

							<p className='card-author'>{recipe_author}</p>

							{recipe_serves !== null && recipe_calories !== null ? (
								<ul className='card-cal-serves'>
									{recipe_serves !== null ? (
										<li className='card-serves'>
											<FontAwesomeIcon
												className='card-icon'
												icon={faUtensils}
											/>
											<span>serves: {recipe_serves}</span>
										</li>
									) : (
										<li hidden></li>
									)}
									{recipe_calories !== null ? (
										<li className='card-cals'>
											<FontAwesomeIcon className='card-icon' icon={faFire} />
											<span>calories: {recipe_calories}</span>
										</li>
									) : (
										<li hidden></li>
									)}
								</ul>
							) : (
								<ul hidden></ul>
							)}

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
							<h2 className='card-subtitle'>Ingredients</h2>
							<ul className='card-ingredients fa-ul'>
								{ingredients.map((ingredient) => {
									return (
										<li key={ingredient}>
											<FontAwesomeIcon icon={faAngleRight} listItem />
											<span>{ingredient}</span>
										</li>
									);
								})}
							</ul>
							<h2 className='card-subtitle'>Method:</h2>
							<ol className='card-method'>
								{method.map((step) => {
									return <li key={step}>{step}</li>;
								})}
							</ol>

							{recipe_url !== null ? (
								<a href={recipe_url} className='card-url'>
									View recipe on website
								</a>
							) : (
								<p hidden></p>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default CardInfo;
