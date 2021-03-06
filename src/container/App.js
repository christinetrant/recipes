// Import Core
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Import Components
import Nav from "../components/Nav";
import CardList from "../components/CardList";
import CardInfo from "../components/CardInfo";
import AddRecipe from "../components/AddRecipe";
import WelcomePage from "../components/WelcomePage";
// Import Styles
import "./App.css";

// DATABASE:
// FIX: Add date entered and show in desc order

// CSS:
//  FIX: Tag Colors change to one main function
// TODO: max three tags, min 1

// TODO: Change state to 'all' when new recipe added and return to homepage

// TODO: EDIT FORM
// TODO: split form into smaller components in Form folder
// TODO: MAKE CREATE A BIG CARD - LANDSCAPE
// TODO: UPLOAD IMAGES AND SAVE WITH ID/NAME

// Color scheme - https://www.schemecolor.com/rainbow-pastels-color-scheme.php
// FIX: Fixed nav on homepage - https://codepen.io/shashankp250/pen/OJVWqbX
// TODO: responsive nav
// TODO: use infinite scroll rather than SCROLL
// TODO: Images for recipes

// TIDYUP: Split css into corresponding files
// FIX:  open in new tab?

class App extends Component {
	constructor() {
		super();
		this.state = {
			recipes: {},
			searchBox: "",
			category: "all",
			recipe: {},
      inEditMode: false
		};
		// this.deleteRecipes = this.deleteRecipes.bind(this);
	}

	// componentDidMount() {
	//   fetch('http://localhost:3000')
	//     .then(response => response.json())
	//     .then(console.log);

	//   console.log('r', this.state.recipes);
	// }

	componentDidMount() {
		this.getRecipes();
	}

	getRecipes = () => {
		console.log("hi");
		const API = "http://localhost:3000";
		fetch(API)
			.then((response) => response.json())
			.then((data) => {
				// console.log('db recipes', data);
				return this.setState({ recipes: data });
			});
	};

	deleteRecipes = (recipe) => {
		console.log("delete me!", recipe);
		const API = `http://localhost:3000/${recipe}`;
		fetch(API, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((res) => console.log(res));

		// once added reload recipes fetch call
		return this.getRecipes();
	};

	editRecipe = (recipe) => {
    // this.setState({inEditMode: true})
		// console.log("one", recipe);
		// const API = `http://localhost:3000/${recipe}/edit`;
		// fetch(API)
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log("edit db recipe", data[0]);
		// 		return this.setState({ recipe: data[0] });
		// 	});
		// console.log("one:", this.state);
	};

	onSearchChange = (event) => {
		this.setState({ searchBox: event.target.value });
	};

	onFilterChange = (category) => {
		this.setState({ category });
	};

	// randomise tag Colors in cards
	tagColor = () => {
		const colors = ["purple", "yellow", "orange", "pink", "green", "blue"];
		let tagColor = colors[Math.floor(Math.random() * colors.length)];
	};

	// Render Function - Loading Page
	renderLoading = () => {
		return (
			<div className='message-div bg'>
				<h1 className='message'>Loading</h1>
			</div>
		);
	};

	renderNoCategory = () => {
		return (
			<div className='message-div bg'>
				<h1 className='message'>no recipes in this category!</h1>
			</div>
		);
	};

	renderHeader = () => {
		return <h1 className='header-title'>My Recipes</h1>;
	};

	renderNav = () => {
		return (
			<Nav
				onSearchChange={this.onSearchChange}
				onFilterChange={this.onFilterChange}
			/>
		);
	};

	renderRoutes = () => {
		return (
			<>
			<Route
								exact
								path='/create'
								render={(props) => (
									<AddRecipe getRecipes={this.getRecipes} {...props} />
								)}
							/>
							<Route
								path='/:id'
								render={(props) => (
									<CardInfo
										deleteRecipes={this.deleteRecipes}
										editRecipe={this.editRecipe}
										{...props}
									/>
								)}
							/>
							<Route
								path='/edit'
								render={(props) => (
									<AddRecipe
										getRecipes={this.getRecipes}
										editRecipe={this.editRecipe}
										{...props}
									/>
								)}
							/>
							</>
		)
	}

	render() {
		const { recipes, searchBox, category } = this.state;
		// if the user has no recipes in database:
		if (!recipes.length) {
			return (
				<WelcomePage
					renderHeader={this.renderHeader}
					getRecipes={this.getRecipes}
					editRecipe={this.editRecipe}
				/>	
			);
		} else {
			// Filter recipes function
			const filterRecipes = recipes.filter((recipe) => {
				// console.log('first recipe', recipe.recipe_category);
				// console.log('rec', recipe.recipe_tag);
				let filteredValue = "";
				let recipeCategory = category.toLowerCase();
				let recipeTitle = recipe.recipe_name
					.toLowerCase()
					.includes(searchBox.toLowerCase());
				if (recipe.recipe_category.toLowerCase() === recipeCategory) {
					filteredValue = recipeTitle;
				} else if (recipeCategory === "all" || "") {
					filteredValue = recipeTitle;
				}
				return filteredValue;
			});

			const renderHomepage = () => {
				return !filterRecipes.length ? (
					this.renderNoCategory()
				) : (
					<>
					<CardList
						recipes={filterRecipes}
						deleteRecipes={this.deleteRecipes}
						editRecipe={this.editRecipe}
					/>
				
					</>
					
				);
			};

			return !recipes.length ? (
				this.renderLoading()
			) : (
				<>
					{this.renderHeader()}
					{/* {this.renderNav()}
          {renderHomepage()} */}


{/* FIX: Need a Home Component to then call all routes at bottom of this page! */}
<Router>
						<Switch>
							<Route
								path='/'
								exact
								render={() => {
									return (
										<>
											{this.renderNav()}
											{renderHomepage()}
										</>
									);
								}}
							/>

							{this.renderRoutes()}
						</Switch>
					</Router>
				</>
			);
			
		}
	}
}

export default App;
