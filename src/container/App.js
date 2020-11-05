// Import Core
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Import Components
import Nav from '../components/Nav';
import CardInfo from '../components/CardInfo';
// import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
// Import Recipes JSON
import recipes from '../recipes.json';
// Import Styles
import './App.css';

// TIDYUP: Don't show empty json objects!!!
// FIX: Fixed header
// TODO: category background card not color!
// TODO: use infinite scroll rather than SCROLL
// TODO: Images for recipes

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: recipes,
      searchBox: '',
      category: 'all'
    };
  }

  // componentDidMount() {
  //   console.log(recipes);
  // }

  onSearchChange = event => {
    this.setState({ searchBox: event.target.value });
  };

  onFilterChange = category => {
    this.setState({ category });
  };

  render() {
    const { recipes, searchBox, category } = this.state;
    const filterRecipes = recipes.filter(recipe => {
      if (recipe.category.toLowerCase() === category.toLowerCase()) {
        return recipe.title.toLowerCase().includes(searchBox.toLowerCase());
      } else if (category.toLowerCase() === 'all' || '') {
        return recipe.title.toLowerCase().includes(searchBox.toLowerCase());
      }
    });

    const CardList = () => {
      // return <CardList recipes={filterRecipes} />;
      // console.log('boo');
      return <h1>Hlo</h1>;
    };

    return !recipes.length ? (
      <div className='App'>
        <h1>Loading</h1>
      </div>
    ) : (
      <div className='App'>
        {/* <Switch> */}

        <h1 className='header-title'>My Recipes</h1>
        <Nav
          onSearchChange={this.onSearchChange}
          onFilterChange={this.onFilterChange}
        />
        <Router>
          <Switch>
            <Route path='/' exact component={CardList} />
            <Route path='/card/:id' component={CardInfo} />
          </Switch>
        </Router>

        {/* <Scroll> */}
        {/* <ErrorBoundary> */}
        {/* <CardList recipes={filterRecipes} /> */}

        {/* </ErrorBoundary> */}
        {/* </Scroll> */}
        {/* <Route path='/' component={CardInfo} /> */}

        {/* </Switch> */}
      </div>
    );
  }
}

export default App;
