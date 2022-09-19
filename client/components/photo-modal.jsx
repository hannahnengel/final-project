import React from 'react';

export default class PhotoModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: null,
      fileName: null
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const file = this.fileInputRef.current.files[0];
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('image', file);

    const req = {
      method: 'POST',
      headers: {
        'x-access-token': xaccesstoken
      },
      body: formData
    };
    fetch('/api/auth/profile-picture/', req)
      .then(res => res.json())
      .then(result => {
        const { fileName, url } = result;
        this.setState({ url, fileName });
      });
  }

  render() {
    // console.log('STATE', this.state);
    let profilePicture =
    (<div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '175px', height: '175px', backgroundColor: '#D9D9D9' }}>
      <i className="fa-solid fa-camera fa-2xl" style={{ color: '#6D6969' }}></i>
    </div>);

    if (this.state.url !== null && this.state.fileName !== null) {
      const { fileName, url } = this.state;
      profilePicture = (
        <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '175px', height: '175px' }}>
          <img className='profile-picture' src={url} alt={fileName} />
        </div>
      );
    }

    const modalCardStyle = {
      backgroundColor: '#292929'

    };

    const modalStyle = {
      backgroundColor: 'rgba(41, 41, 41, 0.70)'
    };

    let photoModalClass = '';
    if (this.state.success === true) {

      photoModalClass = 'invisible';
    }

    return (
      <div className="modal fade" style={modalStyle} id='photo-modal' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="photo-modal" aria-hidden="true">
        <div className="modal-dialog mx-0 p-0" style={{ width: '100%', marginTop: '85px' }} >
          <div className="modal-content " style={{ width: '100vw' }}>
            <div className="modal-body border-0 dynamic-height" style={modalCardStyle}>
              <div className={`container-fluid ${photoModalClass}`}>
                <div className="row">
                  <div className='col d-flex justify-content-end'>
                    <i className="fa-solid fa-x" data-bs-dismiss="modal" style={{ color: 'white' }}></i>
                  </div>
                </div>
                <div className="row">
                  <div className="col d-flex justify-content-center">
                    {profilePicture}
                  </div>
                </div>
                <div className="row my-2 d-flex justify-content-center">
                  <div className="col-3 col-md-2 px-4">
                    <div className="col d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                      <i className="fa-solid fa-pen-to-square fa-xl" style={{ color: 'white' }}></i>
                    </div>
                    <div className="col d-flex justify-content-center">
                      <p className='form-text' style={{ color: 'white' }}>Edit</p>
                    </div>
                  </div>
                  <div className="col-3 col-md-2 px-4">
                    <div className="col d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                      <form>
                        <label htmlFor="upload-photo"><i className="fa-solid fa-arrow-up-from-bracket fa-xl" style={{ color: 'white' }}></i></label>
                        <input ref={this.fileInputRef} className='invisible' type="file" accept="image/jpeg, image/png, image/jpg" name="image" id="upload-photo" onChange={this.handleSubmit} />
                      </form>
                    </div>
                    <div className="col d-flex justify-content-center">
                      <p className='form-text' style={{ color: 'white' }}>Upload</p>
                    </div>
                  </div>
                  <div className="col-3 col-md-2 px-4">
                    <div className="col d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                      <i className="fa-solid fa-trash-can fa-xl" style={{ color: 'white' }}></i>
                    </div>
                    <div className="col d-flex justify-content-center">
                      <p className='form-text' style={{ color: 'white' }}>Delete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
