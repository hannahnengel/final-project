import React from 'react';

export default class HateSelectionsInputs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hashroute: this.props.route.path
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // const xaccesstoken = window.localStorage.getItem('react-context-jwt');
    const category = this.state.hashroute.slice(16);
    // const value = this.state[category];
    const { categories } = this.props;

    for (let i = 0; i < categories.length; i++) {
      const currentCategoryArray = categories[i].split(' ');
      const currentCategory = currentCategoryArray.join('-').toLowerCase();

      if (category === currentCategory) {
        if (categories[i] === categories[categories.length - 1]) {
          return;
        }
        const words = categories[i + 1].split(' ');
        const hash = words.join('-').toLowerCase();
        this.setState({ hashroute: `hate-selections/${hash}` });
        window.location.hash = `hate-selections/${hash}`;
      }
    }
  }

  handlePrevious() {
    const { categories } = this.props;
    const category = this.state.hashroute.slice(16);
    for (let i = 0; i < categories.length; i++) {
      const currentCategoryArray = categories[i].split(' ');
      const currentCategory = currentCategoryArray.join('-').toLowerCase();
      if (category === currentCategory) {
        const words = categories[i - 1].split(' ');
        const hash = words.join('-').toLowerCase();
        window.location.hash = `hate-selections/${hash}`;
        this.setState({ hashroute: `hate-selections/${hash}` });
      }
    }
  }

  render() {
    const pets = [
      { selectionId: 1, selection: 'dogs', src: '/hate-selections-imgs/dog.jpeg' },
      { selectionId: 2, selection: 'cats', src: '/hate-selections-imgs/cats.jpeg' },
      { selectionId: 3, selection: 'hamsters', src: '/hate-selections-imgs/hamsters.webp' },
      { selectionId: 4, selection: 'birds', src: '/hate-selections-imgs/bird.jpeg' },
      { selectionId: 5, selection: 'fish', src: '/hate-selections-imgs/Fish.webp' },
      { selectionId: 6, selection: 'horses', src: '/hate-selections-imgs/horses.jpeg' }
    ];

    const foods = [
      { selectionId: 7, selection: 'sushi', src: '/hate-selections-imgs/Sushi.jpeg' },
      { selectionId: 8, selection: 'spicy foods', src: '/hate-selections-imgs/spicyfood.jpeg' },
      { selectionId: 9, selection: 'fruits & vegetables', src: '/hate-selections-imgs/vegetables.png' },
      { selectionId: 10, selection: 'bacon', src: '/hate-selections-imgs/bacon.webp' },
      { selectionId: 11, selection: 'cheese', src: '/hate-selections-imgs/cheese.webp' },
      { selectionId: 12, selection: 'breakfast', src: '/hate-selections-imgs/Breakfast.jpeg' },
      { selectionId: 13, selection: 'pineapple pizza', src: '/hate-selections-imgs/pinapplepizza.png' },
      { selectionId: 14, selection: 'vegan', src: '/hate-selections-imgs/vegan.jpeg' }
    ];

    const desserts = [
      { selectionId: 15, selection: 'chocolate', src: '/hate-selections-imgs/chocolate.jpeg' },
      { selectionId: 16, selection: 'candy', src: '/hate-selections-imgs/candy.jpeg' },
      { selectionId: 17, selection: 'cake', src: '/hate-selections-imgs/cake.jpeg' },
      { selectionId: 18, selection: 'ice cream', src: '/hate-selections-imgs/ice-cream.png' },
      { selectionId: 19, selection: 'cookies', src: '/hate-selections-imgs/cookies.jpeg' },
      { selectionId: 20, selection: 'pie', src: '/hate-selections-imgs/pie.jpeg' }
    ];

    const vacationActivities = [
      { selectionId: 21, selection: 'beach', src: '/hate-selections-imgs/beach.png' },
      { selectionId: 22, selection: 'museums', src: '/hate-selections-imgs/museums.webp' },
      { selectionId: 23, selection: 'hiking', src: '/hate-selections-imgs/hiking.png' },
      { selectionId: 24, selection: 'skiing & snowboarding', src: '/hate-selections-imgs/skiing-snowboarding.png' },
      { selectionId: 25, selection: 'dining out', src: '/hate-selections-imgs/dining-out.png' },
      { selectionId: 26, selection: 'fishing', src: '/hate-selections-imgs/fishing.webp' }
    ];

    const tvShows = [
      { selectionId: 27, selection: 'the office', src: '/hate-selections-imgs/the-office.png' },
      { selectionId: 28, selection: 'friends', src: '/hate-selections-imgs/friends.png' },
      { selectionId: 29, selection: 'rick & morty', src: '/hate-selections-imgs/rickmorty.png' },
      { selectionId: 30, selection: 'star trek', src: '/hate-selections-imgs/startrek.png' },
      { selectionId: 31, selection: 'sports', src: '/hate-selections-imgs/sports.png' },
      { selectionId: 32, selection: 'anime', src: '/hate-selections-imgs/anime.png' },
      { selectionId: 33, selection: 'reality tv', src: '/hate-selections-imgs/RealityTV.png' },
      { selectionId: 34, selection: 'greys anatomy', src: '/hate-selections-imgs/greysanatomy.png' },
      { selectionId: 35, selection: 'family guy', src: '/hate-selections-imgs/familyguy.png' },
      { selectionId: 36, selection: 'law & order', src: '/hate-selections-imgs/laworder.png' }
    ];

    const hobbies = [
      { selectionId: 37, selection: 'instrument/ singing', src: '/hate-selections-imgs/instrument_singing.png' },
      { selectionId: 38, selection: 'video games/ computer', src: '/hate-selections-imgs/videogames.png' },
      { selectionId: 39, selection: 'drawing/ art', src: '/hate-selections-imgs/drawing_art.png' },
      { selectionId: 40, selection: 'reading/ writing', src: '/hate-selections-imgs/reading_writing.png' },
      { selectionId: 41, selection: 'drinking', src: '/hate-selections-imgs/drinking.png' },
      { selectionId: 42, selection: 'baking', src: '/hate-selections-imgs/baking.png' },
      { selectionId: 43, selection: 'sports', src: '/hate-selections-imgs/sports.png' },
      { selectionId: 44, selection: 'board games', src: '/hate-selections-imgs/board games.png' },
      { selectionId: 45, selection: 'dancing', src: '/hate-selections-imgs/dancing.png' },
      { selectionId: 46, selection: 'cars', src: '/hate-selections-imgs/cars.png' }
    ];

    const petPeeves = [
      { selectionId: 47, selection: 'incorrect spelling/ grammar', src: '/hate-selections-imgs/grammarspelling.png' },
      { selectionId: 48, selection: 'untidy rooms', src: '/hate-selections-imgs/untidy.png' },
      { selectionId: 49, selection: 'being late', src: '/hate-selections-imgs/late.png' },
      { selectionId: 50, selection: 'PDA', src: '/hate-selections-imgs/pda.png' },
      { selectionId: 51, selection: 'cracking knuckles', src: '/hate-selections-imgs/cracking-knuckles.png' },
      { selectionId: 52, selection: 'overly optimistic', src: '/hate-selections-imgs/optimism.png' },
      { selectionId: 53, selection: 'texting & talking', src: '/hate-selections-imgs/texting_talking.png' },
      { selectionId: 54, selection: 'not signaling', src: '/hate-selections-imgs/turnsignal.png' }
    ];

    const drinks = [
      { selectionId: 55, selection: 'water', src: '/hate-selections-imgs/water.png' },
      { selectionId: 56, selection: 'soda', src: '/hate-selections-imgs/soda.png' },
      { selectionId: 57, selection: 'beer', src: '/hate-selections-imgs/beer.png' },
      { selectionId: 58, selection: 'wine', src: '/hate-selections-imgs/wine.png' },
      { selectionId: 59, selection: 'coffee', src: '/hate-selections-imgs/coffee.png' },
      { selectionId: 60, selection: 'tea', src: '/hate-selections-imgs/tea.png' },
      { selectionId: 61, selection: 'milk', src: '/hate-selections-imgs/milk.png' },
      { selectionId: 62, selection: 'juice', src: '/hate-selections-imgs/juice.png' },
      { selectionId: 63, selection: 'cocktails', src: '/hate-selections-imgs/cocktails.png' },
      { selectionId: 64, selection: 'tequila', src: '/hate-selections-imgs/tequila.png' }
    ];

    const fandoms = [
      { selectionId: 65, selection: 'harry potter', src: '/hate-selections-imgs/harry potter.png' },
      { selectionId: 66, selection: 'lord of the rings', src: '/hate-selections-imgs/LOTR.png' },
      { selectionId: 67, selection: 'star wars', src: '/hate-selections-imgs/starwars.png' },
      { selectionId: 68, selection: 'star trek', src: '/hate-selections-imgs/startrek.png' },
      { selectionId: 69, selection: 'pokemon', src: '/hate-selections-imgs/pokemon.png' },
      { selectionId: 70, selection: 'disney/ pixar', src: '/hate-selections-imgs/Disney.png' },
      { selectionId: 71, selection: 'marvel', src: '/hate-selections-imgs/marvel.png' },
      { selectionId: 72, selection: 'DC comics', src: '/hate-selections-imgs/DC.png' },
      { selectionId: 73, selection: 'game of thrones', src: '/hate-selections-imgs/GOT.png' },
      { selectionId: 74, selection: 'twilight', src: '/hate-selections-imgs/twilight.png' }
    ];

    const musicGenres = [
      { selectionId: 75, selection: 'pop', src: '/hate-selections-imgs/pop.png' },
      { selectionId: 76, selection: 'country', src: '/hate-selections-imgs/country.png' },
      { selectionId: 77, selection: 'EDM/ electronic', src: '/hate-selections-imgs/electronic.png' },
      { selectionId: 78, selection: 'classical', src: '/hate-selections-imgs/classical.png' },
      { selectionId: 79, selection: 'rock', src: '/hate-selections-imgs/Rock.png' },
      { selectionId: 80, selection: 'jazz', src: '/hate-selections-imgs/jazz.png' },
      { selectionId: 81, selection: 'rap', src: '/hate-selections-imgs/rap.png' },
      { selectionId: 82, selection: 'indie', src: '/hate-selections-imgs/indie.png' }
    ];

    const { route } = this.props;
    let rowNumberClass = '';
    let inputSelections = [];
    let category = '';
    let hidePreviousBtnClass = '';
    if (route.path === ('hate-selections/pets')) {
      inputSelections = pets;
      category = 'pets';
      hidePreviousBtnClass = 'invisible';
    }
    if (route.path === 'hate-selections/foods') {
      inputSelections = foods;
      category = 'foods';
    }
    if (route.path === 'hate-selections/desserts') {
      inputSelections = desserts;
      category = 'desserts';
    }
    if (route.path === 'hate-selections/vacation-activities') {
      inputSelections = vacationActivities;
      category = 'vacation-activities';
    }
    if (route.path === 'hate-selections/tv-shows') {
      inputSelections = tvShows;
      category = 'tv-shows';
    }
    if (route.path === 'hate-selections/hobbies') {
      inputSelections = hobbies;
      category = 'hobbies';
    }
    if (route.path === 'hate-selections/pet-peeves') {
      inputSelections = petPeeves;
      category = 'pet-peeves';
    }
    if (route.path === 'hate-selections/drinks') {
      inputSelections = drinks;
      category = 'drinks';
    }
    if (route.path === 'hate-selections/fandoms') {
      inputSelections = fandoms;
      category = 'fandoms';
    }
    if (route.path === 'hate-selections/music-genres') {
      inputSelections = musicGenres;
      category = 'music-genres';
    }

    if (inputSelections.length === 6) {
      rowNumberClass = 'row-cols-md-3';
    }
    if (inputSelections.length === 8) {
      rowNumberClass = 'row-cols-md-4';
    }
    if (inputSelections.length === 10) {
      rowNumberClass = 'row-cols-md-5';
    }

    const inputs = inputSelections.map(selection => {
      const words = selection.selection.split(' ');
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      const selectionValue = words.join('-').toLowerCase();
      const description = words.join(' ');

      return (
      <div className="col pt-3 px-0 selection" key={selection.selectionId}>
          <label htmlFor={`${selectionValue}`}>
            <input
            required
            type='radio'
            id={`${selectionValue}`}
            className='hate-input'
            name={category}
            value={`${selectionValue}`}
            onChange={this.handleChange}
            />
            <div className="selections-container">
              <img className='hate-selection-img' src={`${selection.src}`} alt={`${selection.selection}`}></img>
              <div className="middle">
                <div className="selected p-0 d-flex justify-content-center align-items-center">
                  {`${description}`}
                </div>
              </div>
            </div>
          </label>
        </div>
      );
    });

    // console.log('STATE', this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={`row ${rowNumberClass} row-cols-sm-2`}>
          {inputs}
        </div>
        <div className="row mt-5">
          <div className="d-flex justify-content-center p-0">
            <button type='button' onClick={this.handlePrevious} className={`lt-red-btn next-back-btn px-2 mt-1 me-4 ${hidePreviousBtnClass}`} >
              <span><i className="fa-solid fa-arrow-left"></i></span>
              Previous
            </button>
            <button type='submit' className='lt-red-btn next-back-btn px-2 mt-1 ms-4'>
              Next
              <span><i className="fa-solid fa-arrow-right"></i></span>
            </button>
          </div>
        </div>
      </form>
    );
  }

}
