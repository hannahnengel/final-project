import React from 'react';
import IncompleteProfile from '../components/incomplete-profile';
import Matches from '../components/matches';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profileComplete: false,
      isLoading: true
    };
    this.handleDemoClick = this.handleDemoClick.bind(this);
  }

  handleSignInClick() {
    window.location.href = '#sign-in';
  }

  handleRegisterClick() {
    window.location.href = '#register';
  }

  handleDemoClick() {
    // const { handleSignIn } = this.context;
    let updateComplete = false;
    let count = 0;

    // create & reset demo and related dummy accounts
    const demoData = [
      { demoId: 1, firstName: 'DemoUser', profilePics: { url: '/imgs/Hannah-Engelhardt.jpg', fileName: 'Hannah-Engelhardt.jpg' }, userInfos: { birthday: '1994-07-02', gender: 'female', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Irvine', zipCode: 92618, lat: 33.65, lng: -117.7437, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 3 }, { categoryId: 2, selectionId: 13 }, { categoryId: 3, selectionId: 16 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 28 }, { categoryId: 6, selectionId: 43 }, { categoryId: 7, selectionId: 54 }, { categoryId: 8, selectionId: 56 }, { categoryId: 9, selectionId: 73 }, { categoryId: 10, selectionId: 76 }] },
      { demoId: 2, firstName: 'Ken', profilePics: { url: '/imgs/ken.jpeg', fileName: 'ken.jpeg' }, userInfos: { birthday: '1993-01-31', gender: 'male', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'El Segundo', zipCode: 90245, lat: 33.9203, lng: -118.391853, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 3 }, { categoryId: 2, selectionId: 13 }, { categoryId: 3, selectionId: 16 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 28 }, { categoryId: 6, selectionId: 43 }, { categoryId: 7, selectionId: 54 }, { categoryId: 8, selectionId: 56 }, { categoryId: 9, selectionId: 73 }, { categoryId: 10, selectionId: 76 }] },
      { demoId: 3, firstName: 'SailorMoon', profilePics: { url: '/imgs/SailorMoon.jpg', fileName: 'SailorMoon.jpg' }, userInfos: { birthday: '1992-02-07', gender: 'female', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Los Gatos', zipCode: 95032, lat: 37.2598686218261, lng: -121.962860107421, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 3 }, { categoryId: 2, selectionId: 13 }, { categoryId: 3, selectionId: 16 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 28 }, { categoryId: 6, selectionId: 43 }, { categoryId: 7, selectionId: 54 }, { categoryId: 8, selectionId: 56 }, { categoryId: 9, selectionId: 73 }, { categoryId: 10, selectionId: 76 }] },
      { demoId: 4, firstName: 'Moogle', profilePics: { url: '/imgs/moogle.png', fileName: 'moogle.png' }, userInfos: { birthday: '1997-01-31', gender: 'non-binary', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'El Segundo', zipCode: 90245, lat: 33.93087, lng: -118.39628, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 1 }, { categoryId: 2, selectionId: 13 }, { categoryId: 3, selectionId: 17 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 28 }, { categoryId: 6, selectionId: 43 }, { categoryId: 7, selectionId: 50 }, { categoryId: 8, selectionId: 64 }, { categoryId: 9, selectionId: 72 }, { categoryId: 10, selectionId: 76 }] },
      { demoId: 5, firstName: 'Cloud', profilePics: { url: '/imgs/CloudStrife.jpeg', fileName: 'CloudStrife.jpeg' }, userInfos: { birthday: '1997-01-31', gender: 'male', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'El Segundo', zipCode: 90245, lat: 33.93087, lng: -118.39628, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 3 }, { categoryId: 2, selectionId: 13 }, { categoryId: 3, selectionId: 16 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 28 }, { categoryId: 6, selectionId: 45 }, { categoryId: 7, selectionId: 50 }, { categoryId: 8, selectionId: 56 }, { categoryId: 9, selectionId: 73 }, { categoryId: 10, selectionId: 76 }] },
      { demoId: 6, firstName: 'Jinx', profilePics: { url: '/imgs/Jinx-League-of-Legends.png', fileName: 'Jinx-League-of-Legends.png' }, userInfos: { birthday: '1997-07-02', gender: 'female', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Los Angeles', zipCode: 90064, lat: 34.03294, lng: -118.457787, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 3 }, { categoryId: 2, selectionId: 13 }, { categoryId: 3, selectionId: 16 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 28 }, { categoryId: 6, selectionId: 43 }, { categoryId: 7, selectionId: 54 }, { categoryId: 8, selectionId: 55 }, { categoryId: 9, selectionId: 74 }, { categoryId: 10, selectionId: 78 }] },
      { demoId: 7, firstName: 'NotBlitzcrank', profilePics: { url: '/imgs/Blitzcrank.jpeg', fileName: 'Blitzcrank.jpeg' }, userInfos: { birthday: '1992-07-21', gender: 'non-binary', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Los Angeles', zipCode: 90064, lat: 34.03294, lng: -118.457787, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 5 }, { categoryId: 2, selectionId: 7 }, { categoryId: 3, selectionId: 18 }, { categoryId: 4, selectionId: 23 }, { categoryId: 5, selectionId: 31 }, { categoryId: 6, selectionId: 45 }, { categoryId: 7, selectionId: 54 }, { categoryId: 8, selectionId: 55 }, { categoryId: 9, selectionId: 67 }, { categoryId: 10, selectionId: 76 }] },
      { demoId: 8, firstName: 'Toad', profilePics: { url: '/imgs/Toad.png', fileName: 'Toad.png' }, userInfos: { birthday: '1992-07-30', gender: 'male', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Universal City', zipCode: 91608, lat: 34.138329, lng: -118.359512, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 6 }, { categoryId: 2, selectionId: 8 }, { categoryId: 3, selectionId: 16 }, { categoryId: 4, selectionId: 22 }, { categoryId: 5, selectionId: 31 }, { categoryId: 6, selectionId: 41 }, { categoryId: 7, selectionId: 52 }, { categoryId: 8, selectionId: 64 }, { categoryId: 9, selectionId: 69 }, { categoryId: 10, selectionId: 77 }] },
      { demoId: 9, firstName: 'Mine', profilePics: { url: '/imgs/Mine.png', fileName: 'Mine.png' }, userInfos: { birthday: '1995-02-14', gender: 'female', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Los Gatos', zipCode: 95032, lat: 37.2598686218261, lng: -121.962860107421, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 5 }, { categoryId: 2, selectionId: 14 }, { categoryId: 3, selectionId: 20 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 35 }, { categoryId: 6, selectionId: 43 }, { categoryId: 7, selectionId: 51 }, { categoryId: 8, selectionId: 61 }, { categoryId: 9, selectionId: 70 }, { categoryId: 10, selectionId: 81 }] },
      { demoId: 10, firstName: 'Korok', profilePics: { url: '/imgs/Korok.jpeg', fileName: 'Korok.jpeg' }, userInfos: { birthday: '1997-07-02', gender: 'non-binary', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Redmond', zipCode: 98052, lat: 47.651235, lng: -122.1392071, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 3 }, { categoryId: 2, selectionId: 13 }, { categoryId: 3, selectionId: 16 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 28 }, { categoryId: 6, selectionId: 43 }, { categoryId: 7, selectionId: 54 }, { categoryId: 8, selectionId: 56 }, { categoryId: 9, selectionId: 73 }, { categoryId: 10, selectionId: 76 }] },
      { demoId: 11, firstName: 'Lily', profilePics: { url: '/imgs/Lily.png', fileName: 'Lily.png' }, userInfos: { birthday: '1998-02-14', gender: 'female', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Dana Point', zipCode: 92629, lat: 33.4682191, lng: -117.6898738, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 3 }, { categoryId: 2, selectionId: 13 }, { categoryId: 3, selectionId: 16 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 28 }, { categoryId: 6, selectionId: 43 }, { categoryId: 7, selectionId: 54 }, { categoryId: 8, selectionId: 56 }, { categoryId: 9, selectionId: 73 }, { categoryId: 10, selectionId: 76 }] },
      { demoId: 12, firstName: 'Zenitsu', profilePics: { url: '/imgs/Zenitsu.jpeg', fileName: 'Zenitsu.jpeg' }, userInfos: { birthday: '1998-09-03', gender: 'male', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'San Francisco', zipCode: 94103, lat: 37.7769228, lng: -122.4159354, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 2 }, { categoryId: 2, selectionId: 14 }, { categoryId: 3, selectionId: 16 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 33 }, { categoryId: 6, selectionId: 42 }, { categoryId: 7, selectionId: 53 }, { categoryId: 8, selectionId: 56 }, { categoryId: 9, selectionId: 73 }, { categoryId: 10, selectionId: 76 }] },
      { demoId: 13, firstName: 'Anya', profilePics: { url: '/imgs/Anya.png', fileName: 'Anya.png' }, userInfos: { birthday: '1998-02-14', gender: 'female', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'San Francisco', zipCode: 94108, lat: 37.7904144, lng: -122.4068215, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 5 }, { categoryId: 2, selectionId: 9 }, { categoryId: 3, selectionId: 20 }, { categoryId: 4, selectionId: 22 }, { categoryId: 5, selectionId: 33 }, { categoryId: 6, selectionId: 41 }, { categoryId: 7, selectionId: 54 }, { categoryId: 8, selectionId: 58 }, { categoryId: 9, selectionId: 65 }, { categoryId: 10, selectionId: 78 }] },
      { demoId: 14, firstName: 'Rick', profilePics: { url: '/imgs/RickSanchez.png', fileName: 'RickSanchez.png' }, userInfos: { birthday: '1993-02-21', gender: 'male', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Seattle', zipCode: 98104, lat: 47.6038321, lng: -122.330062, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 4 }, { categoryId: 2, selectionId: 9 }, { categoryId: 3, selectionId: 16 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 29 }, { categoryId: 6, selectionId: 43 }, { categoryId: 7, selectionId: 54 }, { categoryId: 8, selectionId: 60 }, { categoryId: 9, selectionId: 73 }, { categoryId: 10, selectionId: 75 }] },
      { demoId: 15, firstName: 'Peach', profilePics: { url: '/imgs/Princess_Peach.png', fileName: 'Princess_Peach.png' }, userInfos: { birthday: '1992-07-30', gender: 'female', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Universal City', zipCode: 91608, lat: 34.138329, lng: -118.359512, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 1 }, { categoryId: 2, selectionId: 10 }, { categoryId: 3, selectionId: 19 }, { categoryId: 4, selectionId: 23 }, { categoryId: 5, selectionId: 32 }, { categoryId: 6, selectionId: 38 }, { categoryId: 7, selectionId: 49 }, { categoryId: 8, selectionId: 63 }, { categoryId: 9, selectionId: 74 }, { categoryId: 10, selectionId: 76 }] },
      { demoId: 16, firstName: 'Peter', profilePics: { url: '/imgs/Spiderman.png', fileName: 'Spiderman.png' }, userInfos: { birthday: '1994-08-10', gender: 'male', phone: null, contact: '{"email"}' }, friendPreferences: { city: 'Anaheim', zipCode: 92802, lat: 38.81731, lng: -121.29281, mileRadius: 1500, friendGender: '{"female","male","nonBinary"}', friendAge: '25-31' }, userSelections: [{ categoryId: 1, selectionId: 4 }, { categoryId: 2, selectionId: 13 }, { categoryId: 3, selectionId: 20 }, { categoryId: 4, selectionId: 26 }, { categoryId: 5, selectionId: 30 }, { categoryId: 6, selectionId: 44 }, { categoryId: 7, selectionId: 54 }, { categoryId: 8, selectionId: 62 }, { categoryId: 9, selectionId: 72 }, { categoryId: 10, selectionId: 76 }] }
    ];
    const body = demoData;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch('/api/demo-ids', req)
      .then(res => res.json())
      .then(result => {
        const userData = result;
        userData.forEach(user => {
          demoData.forEach(demoUser => {
            if (demoUser.demoId === user.demoId) {
              demoUser.userId = user.userId;
            }
          });
        });
        demoData.forEach((demoUser, index) => {
          req.body = JSON.stringify(demoUser);
          fetch('/api/setup-demo', req)
            .then(res => res.json())
            .then(result => {
              count++;
              if (count === 16) {
                updateComplete = true;
              }

              if (updateComplete) {
                // // handling sign in for demo user
                const email = process.env.DEMO_USER_EMAIL;
                const password = process.env.DEMO_USER_PWD;

                const body = { email, password };

                const req = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
                };
                fetch('/api/auth/sign-in', req)
                  .then(res => res.json())
                  .then(result => {
                    // console.log('result', result);
                    this.setState({ profileComplete: true });
                    // handleSignIn(result);
                  });
              }
            });

        });

      });

  }

  componentDidMount() {
    const { profileComplete } = this.state;
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    if (xaccesstoken !== null) {
      const req = {
        method: 'GET',
        headers: {
          'x-access-token': xaccesstoken
        }
      };
      if (!profileComplete) {
        fetch('/api/auth/user-selections', req)
          .then(res => res.json())
          .then(result => {
            if (result.length === 10) {
              this.setState({ profileComplete: true });
            }
            this.setState({ isLoading: false });
          });
      }
    } else {
      this.setState({ isLoading: false });
    }

  }

  render() {
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    let user;
    if (xaccesstoken === null) {
      user = null;
    } else {
      user = xaccesstoken;
    }

    const { profileComplete, isLoading } = this.state;

    return (
    <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
      {isLoading
        ? (<div className="row">
            <h1><i className="fa-solid fa-spinner fa-lg danger spin spinner"></i></h1>
          </div>)
        : (user !== null
            ? (profileComplete
                ? (<Matches />)
                : (<IncompleteProfile />))
            : (
            <>
              <div className='row mb-5'>
                <div className='col'>
                  <h1>WELCOME</h1>
                </div >
              </div >
              <div className="row">
                <div className="col">
                  <p className='px-3'>A different approach to making new friends...<br /> <br /> Let mutual hatred fuel the fire! &#128293;</p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6 d-flex justify-content-center">
                  <button className='lt-red-btn' onClick={this.handleSignInClick}>
                    <i className="fa-solid fa-arrow-right-to-bracket py-2 pe-2" />
                    Sign In
                  </button>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                  <button className='lt-red-btn' onClick={this.handleRegisterClick}>
                    <i className="fa-solid fa-user py-2 pe-2" />
                    Register
                  </button>
                </div>
              </div>
                <div className="row">
                  <div className="col d-flex justify-content-center">
                    <button className='confirm-btn lt-red-btn' onClick={this.handleDemoClick}>
                      <i className="fa-solid fa-user py-2" />
                      Demo Account
                    </button>
                  </div>
                </div>
            </>
              )
          )

    }
    </div>

    );
  }
}

Home.contextType = AppContext;
