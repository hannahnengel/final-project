import React from 'react';

export default class PhotoModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: null,
      fileName: null,
      isLoading: false
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    const action = event.target.getAttribute('id');
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    const req = {
      headers: {
        'x-access-token': xaccesstoken
      }
    };

    if (action === 'upload-photo') {
      const file = this.fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append('fileName', file.name);
      formData.append('image', file);
      req.method = 'POST';
      req.body = formData;

      fetch('/api/auth/profile-picture/', req)
        .then(res => res.json())
        .then(result => {
          const { fileName, url } = result;
          this.setState({ url, fileName, isLoading: false });
        });
    } else if (action === 'delete-photo') {
      req.method = 'DELETE';
      fetch('/api/auth/profile-picture/', req)
        .then(result => {
          this.setState({ url: null, fileName: null, isLoading: false });
        });
    }

  }

  componentDidMount() {
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'x-access-token': xaccesstoken
      }
    };
    fetch('/api/auth/profile-picture/', req)
      .then(res => res.json())
      .then(result => {
        if (result === 'no info exists') {
          this.setState({ url: null, fileName: null });
        } else {
          const { fileName, url } = result;
          this.setState({ url, fileName, isLoading: false });
        }

      });
  }

  render() {
    const { getDBInfo } = this.props;
    const { isLoading, fileName, url } = this.state;

    let profilePicture =
    (<div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '175px', height: '175px', backgroundColor: '#D9D9D9' }}>
      <i className="fa-solid fa-camera fa-2xl" style={{ color: '#6D6969' }}></i>
    </div>);

    if (!isLoading) {
      if (this.state.url !== null && this.state.url !== undefined && this.state.fileName !== null && this.state.fileName !== undefined) {
        profilePicture = (
          <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '175px', height: '175px' }}>
            <img className='profile-picture' src={url} alt={fileName} />
          </div>
        );
      }
    }

    const modalCardStyle = {
      backgroundColor: '#292929',
      minWidth: '400px'
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
                    <i className="fa-solid fa-x" data-bs-dismiss="modal" onClick={getDBInfo} style={{ color: 'white' }}></i>
                  </div>
                </div>
                <div className="row">
                  <div className="col d-flex justify-content-center">
                    {profilePicture}
                  </div>
                </div>
                <div className="row my-2 d-flex justify-content-center">
                  <div className="col col-md-1 px-4">
                    <div className="col d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                      <form>
                        <label htmlFor="upload-photo"><i className="fa-solid fa-arrow-up-from-bracket fa-xl" style={{ color: 'white' }}></i></label>
                        <input ref={this.fileInputRef} className='invisible' type="file" accept="image/jpeg, image/png, image/jpg" name="image" id="upload-photo" onChange={this.handleSubmit} />
                      </form>
                    </div>
                    <div className="col d-flex justify-content-center">
                      <p className='form-text me-2 my-0' style={{ color: 'white' }}>Upload</p>
                    </div>
                  </div>
                  <div className="col col-md-1 px-4">
                    <div className="col d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                      <i onClick={this.handleSubmit} id="delete-photo" className="fa-solid fa-trash-can fa-xl" style={{ color: 'white' }}></i>
                    </div>
                    <div className="col d-flex justify-content-center">
                      <p className='form-text ms-2 my-0' style={{ color: 'white' }}>Delete</p>
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
