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
      if (route.path.includes(categories[i].toLowerCase())) {
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
        <div className="row">
          <HateSelectionsInputs/>
        </div>
        <div className="row m-5">
          <div className="d-flex justify-content-between">
            <button type='button' className="lt-red-btn next-back-btn px-2 mt-1 mx-4" >
              <span><i className="fa-solid fa-arrow-left"></i></span>
              Previous
            </button>
            <button type='submit' className='lt-red-btn next-back-btn px-2 mt-1 mx-4'>
              Next
              <span><i className="fa-solid fa-arrow-right"></i></span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

HateSelections.contextType = AppContext;
