import React from 'react';

export default class HateSelectionsInputs extends React.Component {

  render() {
    return (
      <form>
       <div className="row row-cols-md-3 row-cols-sm-2">
         <div className="col pt-3 px-0 selection">
            <label htmlFor='dogs'>
              <input
                required
                type="radio"
                className="hate-input"
                id='dogs'
                name='pets'
                value='dogs'
              />
              <div className="selections-container">
                  <img className='hate-selection-img' src='/hate-selections-imgs/dog.jpeg' alt='dogs'></img>
                  <div className="middle">
                    <div className="selected p-0 d-flex justify-content-center align-items-center">Dogs</div>
                  </div>
              </div>
            </label>

         </div>
        <div className="col pt-3 px-0">
            <label htmlFor='cats'>
              <input
                required
                type="radio"
                className="hate-input"
                id='cats'
                name='pets'
                value='cats'
              />
              <div className="selections-container">
                <img className='hate-selection-img' src='/hate-selections-imgs/cats.jpeg' alt='cats'></img>
                <div className="middle">
                  <div className="selected p-0 d-flex justify-content-center align-items-center">Cats</div>
                </div>
              </div>
            </label>
        </div>
          <div className="col pt-3 px-0">
            <label htmlFor='hamsters'>
              <input
                required
                type="radio"
                className="hate-input"
                id='hamsters'
                name='pets'
                value='hamsters'
              />
              <div className="selections-container">
                <img className='hate-selection-img' src='/hate-selections-imgs/hamsters.webp' alt='hamsters'></img>
                <div className="middle">
                  <div className="selected p-0 d-flex justify-content-center align-items-center">Hamsters</div>
                </div>
              </div>
            </label>
        </div>
          <div className="col pt-3 px-0">
            <label htmlFor='birds'>
              <input
                required
                type="radio"
                className="hate-input"
                id='birds'
                name='pets'
                value='birds'
              />
              <div className="selections-container">
                <img className='hate-selection-img' src='/hate-selections-imgs/bird.jpeg' alt='birds'></img>
                <div className="middle">
                  <div className="selected p-0 d-flex justify-content-center align-items-center">Birds</div>
                </div>
              </div>
            </label>
        </div>
          <div className="col pt-3 px-0">
            <label htmlFor='fish'>
              <input
                required
                type="radio"
                className="hate-input"
                id='fish'
                name='pets'
                value='fish'
              />
              <div className="selections-container">
                <img className='hate-selection-img' src='/hate-selections-imgs/Fish.webp' alt='fish'></img>
                <div className="middle">
                  <div className="selected p-0 d-flex justify-content-center align-items-center">Fish</div>
                </div>
              </div>
            </label>
        </div>
          <div className="col pt-3 px-0">
            <label htmlFor='horses'>
              <input
                required
                type="radio"
                className="hate-input"
                id='horses'
                name='pets'
                value='horses'
              />
              <div className="selections-container">
                <img className='hate-selection-img' src='/hate-selections-imgs/horses.jpeg' alt='horses'></img>
                <div className="middle">
                  <div className="selected p-0 d-flex justify-content-center align-items-center">Horses</div>
                </div>
              </div>
            </label>
          </div>
       </div>
        <div className="row mt-5">
          <div className="d-flex justify-content-center p-0">
            <button type='button' className="lt-red-btn next-back-btn px-2 mt-1 me-4" >
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
