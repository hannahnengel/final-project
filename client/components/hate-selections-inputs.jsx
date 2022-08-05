import React from 'react';

export default class HateSelectionsInputs extends React.Component {

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
    let hidePreviousBtnClass = '';
    if (route.path.includes('pets')) {
      inputSelections = pets;
      hidePreviousBtnClass = 'invisible';
    }
    if (route.path.includes('foods')) {
      inputSelections = foods;
    }
    if (route.path.includes('desserts')) {
      inputSelections = desserts;
    }
    if (route.path.includes('vacation-activities')) {
      inputSelections = vacationActivities;
    }
    if (route.path.includes('tv-shows')) {
      inputSelections = tvShows;
    }
    if (route.path.includes('hobbies')) {
      inputSelections = hobbies;
    }
    if (route.path.includes('pet-peeves')) {
      inputSelections = petPeeves;
    }
    if (route.path.includes('drinks')) {
      inputSelections = drinks;
    }
    if (route.path.includes('fandoms')) {
      inputSelections = fandoms;
    }
    if (route.path.includes('music-genres')) {
      inputSelections = musicGenres;
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
            className='hate-input'
            name='selection'
            value={`${selectionValue}`}
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

    return (
      <form>
        <div className={`row ${rowNumberClass} row-cols-sm-2`}>
          {inputs}
        </div>
        <div className="row mt-5">
          <div className="d-flex justify-content-center p-0">
            <button type='button' className={`lt-red-btn next-back-btn px-2 mt-1 me-4 ${hidePreviousBtnClass}`} >
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
