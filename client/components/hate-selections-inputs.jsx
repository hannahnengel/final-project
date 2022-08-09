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
      { selection: 'dogs', src: '/hate-selections-imgs/dog.jpeg' },
      { selection: 'cats', src: '/hate-selections-imgs/cats.jpeg' },
      { selection: 'hamsters', src: '/hate-selections-imgs/hamsters.webp' },
      { selection: 'birds', src: '/hate-selections-imgs/bird.jpeg' },
      { selection: 'fish', src: '/hate-selections-imgs/Fish.webp' },
      { selection: 'horses', src: '/hate-selections-imgs/horses.jpeg' }
    ];

    const foods = [
      { selection: 'sushi', src: '/hate-selections-imgs/Sushi.jpeg' },
      { selection: 'spicy foods', src: '/hate-selections-imgs/spicyfood.jpeg' },
      { selection: 'fruits & vegetables', src: '/hate-selections-imgs/vegetables.png' },
      { selection: 'bacon', src: '/hate-selections-imgs/bacon.webp' },
      { selection: 'cheese', src: '/hate-selections-imgs/cheese.webp' },
      { selection: 'breakfast', src: '/hate-selections-imgs/Breakfast.jpeg' },
      { selection: 'pineapple pizza', src: '/hate-selections-imgs/pinapplepizza.png' },
      { selection: 'vegan', src: '/hate-selections-imgs/vegan.jpeg' }
    ];

    const desserts = [
      { selection: 'chocolate', src: '/hate-selections-imgs/chocolate.jpeg' },
      { selection: 'candy', src: '/hate-selections-imgs/candy.jpeg' },
      { selection: 'cake', src: '/hate-selections-imgs/cake.jpeg' },
      { selection: 'ice cream', src: '/hate-selections-imgs/ice-cream.png' },
      { selection: 'cookies', src: '/hate-selections-imgs/cookies.jpeg' },
      { selection: 'pie', src: '/hate-selections-imgs/pie.jpeg' }
    ];

    const vacationActivities = [
      { selection: 'beach', src: '/hate-selections-imgs/beach.png' },
      { selection: 'museums', src: '/hate-selections-imgs/museums.webp' },
      { selection: 'hiking', src: '/hate-selections-imgs/hiking.png' },
      { selection: 'skiing & snowboarding', src: '/hate-selections-imgs/skiing-snowboarding.png' },
      { selection: 'dining out', src: '/hate-selections-imgs/dining-out.png' },
      { selection: 'fishing', src: '/hate-selections-imgs/fishing.webp' }
    ];

    const tvShows = [
      { selection: 'the office', src: '/hate-selections-imgs/the-office.png' },
      { selection: 'friends', src: '/hate-selections-imgs/friends.png' },
      { selection: 'rick & morty', src: '/hate-selections-imgs/rickmorty.png' },
      { selection: 'star trek', src: '/hate-selections-imgs/startrek.png' },
      { selection: 'sports', src: '/hate-selections-imgs/sports.png' },
      { selection: 'anime', src: '/hate-selections-imgs/anime.png' },
      { selection: 'reality tv', src: '/hate-selections-imgs/RealityTV.png' },
      { selection: 'greys anatomy', src: '/hate-selections-imgs/greysanatomy.png' },
      { selection: 'family guy', src: '/hate-selections-imgs/familyguy.png' },
      { selection: 'law & order', src: '/hate-selections-imgs/laworder.png' }
    ];

    const hobbies = [
      { selection: 'instrument/ singing', src: '/hate-selections-imgs/instrument_singing.png' },
      { selection: 'video games/ computer', src: '/hate-selections-imgs/videogames.png' },
      { selection: 'drawing/ art', src: '/hate-selections-imgs/drawing_art.png' },
      { selection: 'reading/ writing', src: '/hate-selections-imgs/reading_writing.png' },
      { selection: 'drinking', src: '/hate-selections-imgs/drinking.png' },
      { selection: 'baking', src: '/hate-selections-imgs/baking.png' },
      { selection: 'sports', src: '/hate-selections-imgs/sports.png' },
      { selection: 'board games', src: '/hate-selections-imgs/board games.png' },
      { selection: 'dancing', src: '/hate-selections-imgs/dancing.png' },
      { selection: 'cars', src: '/hate-selections-imgs/cars.png' }
    ];

    const petPeeves = [
      { selection: 'incorrect spelling/ grammar', src: '/hate-selections-imgs/grammarspelling.png' },
      { selection: 'untidy rooms', src: '/hate-selections-imgs/untidy.png' },
      { selection: 'being late', src: '/hate-selections-imgs/late.png' },
      { selection: 'PDA', src: '/hate-selections-imgs/pda.png' },
      { selection: 'cracking knuckles', src: '/hate-selections-imgs/cracking-knuckles.png' },
      { selection: 'overly optimistic', src: '/hate-selections-imgs/optimism.png' },
      { selection: 'texting & talking', src: '/hate-selections-imgs/texting_talking.png' },
      { selection: 'not signaling', src: '/hate-selections-imgs/turnsignal.png' }
    ];

    const drinks = [
      { selection: 'water', src: '/hate-selections-imgs/water.png' },
      { selection: 'soda', src: '/hate-selections-imgs/soda.png' },
      { selection: 'beer', src: '/hate-selections-imgs/beer.png' },
      { selection: 'wine', src: '/hate-selections-imgs/wine.png' },
      { selection: 'coffee', src: '/hate-selections-imgs/coffee.png' },
      { selection: 'tea', src: '/hate-selections-imgs/tea.png' },
      { selection: 'milk', src: '/hate-selections-imgs/milk.png' },
      { selection: 'juice', src: '/hate-selections-imgs/juice.png' },
      { selection: 'cocktails', src: '/hate-selections-imgs/cocktails.png' },
      { selection: 'tequila', src: '/hate-selections-imgs/tequila.png' }
    ];

    const fandoms = [
      { selection: 'harry potter', src: '/hate-selections-imgs/harry potter.png' },
      { selection: 'lord of the rings', src: '/hate-selections-imgs/LOTR.png' },
      { selection: 'star wars', src: '/hate-selections-imgs/starwars.png' },
      { selection: 'star trek', src: '/hate-selections-imgs/startrek.png' },
      { selection: 'pokemon', src: '/hate-selections-imgs/pokemon.png' },
      { selection: 'disney/ pixar', src: '/hate-selections-imgs/Disney.png' },
      { selection: 'marvel', src: '/hate-selections-imgs/marvel.png' },
      { selection: 'DC comics', src: '/hate-selections-imgs/DC.png' },
      { selection: 'game of thrones', src: '/hate-selections-imgs/GOT.png' },
      { selection: 'twilight', src: '/hate-selections-imgs/twilight.png' }
    ];

    const musicGenres = [
      { selection: 'pop', src: '/hate-selections-imgs/pop.png' },
      { selection: 'country', src: '/hate-selections-imgs/country.png' },
      { selection: 'EDM/ electronic', src: '/hate-selections-imgs/electronic.png' },
      { selection: 'classical', src: '/hate-selections-imgs/classical.png' },
      { selection: 'rock', src: '/hate-selections-imgs/Rock.png' },
      { selection: 'jazz', src: '/hate-selections-imgs/jazz.png' },
      { selection: 'rap', src: '/hate-selections-imgs/rap.png' },
      { selection: 'indie', src: '/hate-selections-imgs/indie.png' }
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

    const inputs = inputSelections.map((selection, index) => {
      const words = selection.selection.split(' ');
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      const selectionValue = words.join('-').toLowerCase();
      const description = words.join(' ');

      return (
      <div className="col pt-3 px-0 selection" key={index}>
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
