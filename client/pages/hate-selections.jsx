import React from 'react';
import AppContext from '../lib/app-context';
import HateSelectionsInputs from '../components/hate-selections-inputs';
// import IncompleteProfile from '../components/incomplete-profile';

export default class HateSelections extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    fetch('/api/categories')
      .then(res => res.json())
      .then(result => {
        const catResult = result;
        const categories = [];
        for (let i = 0; i < catResult.length; i++) {
          categories.push(catResult[i].categoryName);
        }
        this.setState({ categories });
        if (result.error) {
          alert(result.error);
        }
      });

  }

  render() {
    const categories = this.state.categories;
    let header = '';

    const { route } = this.context;
    for (let i = 0; i < categories.length; i++) {
      let categoryWords = categories[i].toLocaleLowerCase().split(' ');
      categoryWords = categoryWords.join('-');
      if (route.path.includes(categoryWords)) {
        header = categories[i].toUpperCase();
      }
    }

    return (
      <div className='vhminus text-center d-flex flex-column align-items-center justify-content-center'>
        <div className='row'>
          <div className='col'>
            <h1 className='pt-2'>{header}</h1>
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
