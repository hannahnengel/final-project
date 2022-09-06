import React from 'react';

export default class HateSelectionsInputs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hashroute: this.props.route.path,
      inputSelections: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.getSelections = this.getSelections.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // const xaccesstoken = window.localStorage.getItem('react-context-jwt');
    const category = this.state.hashroute.slice(16);
    const preValue = this.state[category];
    const value = preValue.replaceAll('-', ' ');
    let selection = {};

    for (let i = 0; i < this.state.inputSelections.length; i++) {
      if (this.state.inputSelections[i].selectionName === value) {
        selection = this.state.inputSelections[i];
      }
    }

    const allUserSelections = localStorage.getItem('selections');
    if (allUserSelections !== null) {
      const parsedAllSelections = JSON.parse(allUserSelections);
      for (let i = 0; i < parsedAllSelections.length; i++) {
        if (parsedAllSelections[i].categoryId === selection.categoryId) {
          parsedAllSelections.splice(i, 1);
        }
      }
      parsedAllSelections.push(selection);
      localStorage.setItem('selections', JSON.stringify(parsedAllSelections));
    } else {
      localStorage.setItem('selections', JSON.stringify([selection]));
    }

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
        window.location.hash = `hate-selections/${hash}`;
        this.setState({ hashroute: `hate-selections/${hash}` }, () => {
          this.getSelections();
        });
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
        this.setState({ hashroute: `hate-selections/${hash}` }, () => {
          this.getSelections();
        });
      }
    }
  }

  getSelections() {
    const { hashroute } = this.state;
    const { categories } = this.props;
    let categoryId = null;
    for (let i = 0; i < categories.length; i++) {
      const words = categories[i].split(' ');
      const currentCategory = words.join('-').toLowerCase();
      if (hashroute.slice(16) === currentCategory) {
        categoryId = i + 1;
      }
    }
    if (categoryId !== null) {
      fetch(`/api/selections/${categoryId}`)
        .then(res => res.json())
        .then(result => {
          this.setState({ inputSelections: result });
        });
    }
  }

  componentDidMount() {
    const { hashroute } = this.state;
    if (hashroute.slice(16) === 'pets') {
      fetch('/api/selections/1')
        .then(res => res.json())
        .then(result => {
          this.setState({ inputSelections: result });
        });
    }
  }

  render() {
    // console.log('STATE', this.state);
    const { inputSelections } = this.state;
    const { categories } = this.props;
    if (inputSelections.length === 0) {
      this.getSelections();
    }

    const { route } = this.props;
    let rowNumberClass = '';
    let category = '';
    for (let i = 0; i < categories.length; i++) {
      if (inputSelections.length > 0 && inputSelections[0].categoryId === i + 1) {
        const words = categories[i].split(' ');
        category = words.join('-').toLowerCase();
      }
    }

    let inputs = '';
    if (inputSelections.length > 0) {
      if (inputSelections.length === 6) {
        rowNumberClass = 'row-cols-md-3';
      }
      if (inputSelections.length === 8) {
        rowNumberClass = 'row-cols-md-4';
      }
      if (inputSelections.length === 10) {
        rowNumberClass = 'row-cols-md-5';
      }

      inputs = inputSelections.map(selection => {
        const words = selection.selectionName.split(' ');
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const selectionValue = words.join('-').toLowerCase();
        const description = words.join(' ');

        return (
          <div className="col pt-2 px-0 selection" key={selection.selectionId}>
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
                <img className='hate-selection-img' src={`${selection.src}`} alt={`${selection.selectionName}`}></img>
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
    }

    let hidePreviousBtnClass = '';
    if (route.path === ('hate-selections/pets')) {
      hidePreviousBtnClass = 'invisible';
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {
          (inputSelections.length === 0)
            ? <h1><i className="fa-solid fa-spinner fa-lg danger"></i></h1>
            : <div className={`row ${rowNumberClass} row-cols-sm-2`}>
                { inputs }
              </div>
        }
        <div className="row mt-3">
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
