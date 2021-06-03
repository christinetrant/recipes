// Import Core
import React, { Component } from 'react';
// Import Components
import HomeButton from './Buttons/HomeButton';
// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
			// signInEmail: '',
			// signInPassword: '',
			inputTags: [],
			title: "",
			author: "",
			serves: null,
			calories: null,
			category: "",
			input: "",
			tags: [],
			// "image": "assets/3.jpg",
			url: null,
			ingredients: [],
			method: [],
			date: "",
		};
    console.log('props', this.props);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onIngredientsChange = this.onIngredientsChange.bind(this);
    this.onMethodChange = this.onMethodChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onInputChange = e => {
    const value = e.target.value;
    this.setState({ [e.target.name]: value });
  };

  onTagsChange = e => {
    this.setState({ tags: e.target.value.split('\n') });
  };

  onIngredientsChange = e => {
    let ingredientArr = e.target.value.split('\n');
    this.setState({
      ingredients: ingredientArr.filter(el => el !== '')
    });
  };

  onMethodChange = e => {
    let methodArr = e.target.value.split('\n');
    this.setState({
      method: methodArr.filter(el => el !== '')
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('create props', this.props);
    console.log('tags', this.state);
    if (this.state.inputTags.length < 4 && this.state.inputTags.length > 0) {
      // post new recipe into db which will return a response of updated db
      fetch("http://localhost:3000/create", {
				method: "post",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					title: this.state.title,
					author: this.state.author,
					serves: this.state.serves,
					calories: this.state.calories,
					category: this.state.category,
					url: this.state.url,
					//     // "image": "assets/3.jpg",
					tags: this.state.tags,
					ingredients: this.state.ingredients,
					method: this.state.method,
					date: this.state.date,
				}),
			})
				.then((response) => response.json())

				.then((data) => {
					console.log("db recipes", data);
					// once added reload recipes fetch call
					this.props.getRecipes();
				})
				.then(this.redirectHomePage());
    } else {
      alert('You need to have at least 1 tag and no more than 3!');
    }
  };

  redirectHomePage = () => {
    // then redirect back to homepage
    this.props.history.push('/');
  };

  // For adding tags section:
  // Could probably remove into new component?
  handleTagsInput = e => {
    this.setState({ input: e.target.value });
  };

  handleTagsSubmit = e => {
    e.preventDefault();
    const { inputTags, input, tags } = this.state;
    // if input empty on submit, ignore
    if (input === '') {
      return;
    }
    // Save into tagsArray for adding, deleting tags in form
    let tagsArray;
    inputTags.length > 0
      ? (tagsArray = [
          ...inputTags,
          {
            id: inputTags[inputTags.length - 1].id + 1,
            item: input
          }
        ])
      : (tagsArray = [{ id: 0, item: input }]);

    this.setState({ inputTags: tagsArray });
    // add tagsAr for adding array of input tags to state for db
    let tagsAr = [...tags, input];
    this.setState({ tags: tagsAr });
    // reset input state and input tag (using value in input tag)
    this.setState({ input: '' });
  };

  deleteItem = item => {
    let tagsArray = [...this.state.inputTags];
    let index = tagsArray.indexOf(item);
    tagsArray.splice(index, 1);
    this.setState({ inputTags: tagsArray });
    console.log(this.state);
    return this.state.inputTags;
  };

  render() {
    const categories = ['breakfast', 'main', 'dessert', 'snacks', 'drinks'];
    return (
      <>
        <HomeButton />
        <div className='bg'>
          <div className='card-list'>
            <div className='card-details'>
              <form
                onSubmit={this.handleSubmit}
                className='form'
                autoComplete='off'
              >
                <label>Title:*</label>
                <input
                  type='text'
                  onChange={this.onInputChange}
                  name='title'
                  // value={this.state.title}
                  required
                  placeholder='Title'
                  className='form-input'
                />

                <label>Author:*</label>
                <input
                  type='text'
                  onChange={this.onInputChange}
                  name='author'
                  // value={this.state.author}
                  required
                  placeholder='Author'
                  className='form-input'
                />

                <div className='form-div'>
                  <label>Serves:</label>
                  <input
                    type='number'
                    onChange={this.onInputChange}
                    name='serves'
                    // value={this.state.serves}
                    className='form-input'
                  />

                  <label>Calories:</label>
                  <input
                    type='number'
                    onChange={this.onInputChange}
                    name='calories'
                    // value={this.state.calories}
                    className='form-input'
                  />
                </div>

                <label>Category:*</label>
                <select
                  onChange={this.onInputChange}
                  name='category'
                  // value={this.state.category}
                  required
                  className='form-input'
                  defaultValue={'DEFAULT'}
                >
                  <option value='DEFAULT' disabled hidden>
                    Choose here
                  </option>
                  {categories.map(button => {
                    return (
                      <option key={button} category={button}>
                        {button}
                      </option>
                    );
                  })}
                </select>

                {/*      tags: [],
      // "image": "assets/3.jpg", */}
                <label>Tags:* (up to 3 tags)</label>
                {!this.state.inputTags.length ? (
                  <div hidden></div>
                ) : (
                  <div className='tags-container'>
                    <ul className='tags-list'>
                      {this.state.inputTags.map(item => {
                        return (
                          <li key={item.id}>
                            {item.item}{' '}
                            <span onClick={() => this.deleteItem(item)}>
                              <FontAwesomeIcon
                                className='card-icon'
                                icon={faTimes}
                              />
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <div className='form-tags-div'>
                  <input
                    type='text'
                    className='form-input tags-input'
                    onChange={this.handleTagsInput}
                    maxLength='10'
                    placeholder='E.g., curry'
                    value={this.state.input}
                  />
                  <button
                    className='tags-button btn'
                    type='submit'
                    onClick={this.handleTagsSubmit}
                  >
                    <FontAwesomeIcon className='card-icon' icon={faPlus} />
                  </button>
                </div>

                <label>Url:</label>
                <input
                  type='url'
                  onChange={this.onInputChange}
                  name='url'
                  placeholder='https://'
                  className='form-input'
                />
                <label>Ingredients:*</label>
                <textarea
                  onChange={this.onIngredientsChange}
                  placeholder='Use enter key to separate ingredients'
                  required
                  className='form-input form-text-area'
                />

                {/*}      method: [] */}
                <label>Method:*</label>
                <textarea
                  // method={this.state.method}
                  onChange={this.onMethodChange}
                  placeholder='Use enter key to separate steps'
                  required
                  className='form-input form-text-area'
                  // rows={5}
                  // cols={5}
                />

                {/* <label htmlFor='img'>
              Select image:
              <input type='file' id='img' name='img' accept='image/*' />
            </label> */}

                <button type='submit' className='form-button btn'>
                  Submit
                </button>

                {/* <Link
                  to={{
                    pathname: `/${recipe_name}`,
                    state: recipe
                  }}
                  className='card-link-wrapper'
                >
                  <button type='submit' className='form-button btn'>
                    Submit
                  </button>
                </Link> */}
              </form>
            </div>
          </div>
        </div>
        {/* <form onSubmit={this.handleSubmit}>
            <label>
              Pick your favorite flavor:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value='grapefruit'>Grapefruit</option>
                <option value='lime'>Lime</option>
                <option value='coconut'>Coconut</option>
                <option value='mango'>Mango</option>
              </select>
            </label>
            <input type='submit' value='Submit' />
          </form> */}
        {/* // </section> */}
        {/* // </div> */}
      </>
    );
  }
}

export default AddRecipe;
