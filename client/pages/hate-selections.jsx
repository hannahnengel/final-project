import React from 'react';
import AppContext from '../lib/app-context';
import HateSelectionsInputs from '../components/hate-selections-inputs';
// import IncompleteProfile from '../components/incomplete-profile';

export default class HateSelections extends React.Component {
  render() {

    const categories = ['PETS', 'FOODS', 'DESSERTS', 'VACATION ACTIVITIES', 'TV SHOWS', 'HOBBIES', 'PET PEEVES', 'DRINKS', 'FANDOMS', 'MUSIC GENRES'];
    let header = '';

    const { route } = this.context;
    for (let i = 0; i < categories.length; i++) {
      let categoryWords = categories[i].toLocaleLowerCase().split(' ');
      categoryWords = categoryWords.join('-');
      if (route.path.includes(categoryWords)) {
        header = categories[i];
      }
    }

    return (
      <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
        <div className='row'>
          <div className='col'>
            <h1>{header}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className='px-3'>Select the one you hate the most... &#128293;</p>
          </div>
        </div>
        <div className="row w-100">
          <HateSelectionsInputs route={route} categories={categories}/>
        </div>
      </div>
    );
  }
}

HateSelections.contextType = AppContext;
