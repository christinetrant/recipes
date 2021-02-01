// Import Core
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Import Components
import Nav from '../components/Nav';
import CardList from '../components/CardList';
import CardInfo from '../components/CardInfo';
import AddRecipe from '../components/AddRecipe';
import WelcomePage from '../components/WelcomePage';
// Import Styles
import './App.css';

// DATABASE:
// FIX: Add date entered and show in desc order

// CSS:
//  FIX: Tag Colors in css are specific to a tag e.g. 'christmas', fix to randomise?

// DONE?: IF ING OR METHOD EMPTY STRINGS DON'T INCLUDE
// TODO: go to recipe after submit?
// TODO: max three tags
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
      searchBox: '',
      category: 'all',
      recipe: {}
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
    console.log('hi');
    const API = 'http://localhost:3000';
    fetch(API)
      .then(response => response.json())
      .then(data => {
        // console.log('db recipes', data);
        return this.setState({ recipes: data });
      });
  };

  // deleteRecipes = recipe => {
  //   console.log('delete me!', recipe);
  //   const API = `http://localhost:3000/${recipe}`;
  //   fetch(API, {
  //     method: 'DELETE'
  //   })
  //     .then(res => res.json()) // or res.json()
  //     .then(res => console.log(res));

  //   //   // once added reload recipes fetch call

  //   return this.getRecipes();
  // };

  onSearchChange = event => {
    this.setState({ searchBox: event.target.value });
  };

  onFilterChange = category => {
    this.setState({ category });
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

  render() {
    const { recipes, searchBox, category } = this.state;
    // if the user has no recipes in database:
    if (!recipes.length) {
      return <WelcomePage renderHeader={this.renderHeader} />;
    } else {
      // Filter recipes function

      const filterRecipes = recipes.filter(recipe => {
        // console.log('first recipe', recipe.recipe_category);
        // console.log('rec', recipe.recipe_tag);
        let filteredValue = '';
        let recipeCategory = category.toLowerCase();
        let recipeTitle = recipe.recipe_name
          .toLowerCase()
          .includes(searchBox.toLowerCase());
        if (recipe.recipe_category.toLowerCase() === recipeCategory) {
          filteredValue = recipeTitle;
        } else if (recipeCategory === 'all' || '') {
          filteredValue = recipeTitle;
        }
        return filteredValue;
      });

      const renderHomepage = () => {
        return !filterRecipes.length ? (
          this.renderNoCategory()
        ) : (
          <CardList
            recipes={filterRecipes}
            deleteRecipes={this.deleteRecipes}
          />
        );
      };

      return !recipes.length ? (
        this.renderLoading()
      ) : (
        <>
          {this.renderHeader()}
          {/* {this.renderNav()}
          {renderHomepage()} */}
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

              <Route
                exact
                path='/create'
                render={props => (
                  <AddRecipe getRecipes={this.getRecipes} {...props} />
                )}
              />
              <Route
                path='/:id'
                render={props => (
                  <CardInfo deleteRecipes={this.deleteRecipes} {...props} />
                )}
              />
            </Switch>
          </Router>
        </>
      );
    }
  }
}

export default App;
