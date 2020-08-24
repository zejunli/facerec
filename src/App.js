import React, {Component} from 'react';
import './style/css/App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import Hello from './Components/Hello/Hello';
import * as THREE from 'three';
import WAVES from './vanta.waves.min.js';

const initState = {
  input: '',
  imgURL: '',
  route: 'hello',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entry: 0,
    joined: '',
  }
};

class App extends Component {
  constructor() {
    super()
    this.vantaRef = React.createRef()
    this.state = initState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email:data.email,
      entry: data.entry,
      joined: data.joined,
    }});
  }

  createBoxes = (box) => {
    let rec = null;
    let face = null;
    let wrapper = null;
    for (face of box) {
      // creates an new box and inserts needed attributes.
      rec = document.createElement('div');
      rec.className = 'bounding-box';
      // rec.setAttribute('style', {stl});
      rec.style.top = `${face.topRow}px`;
      rec.style.right = `${face.rightCol}px`;
      rec.style.bottom = `${face.bottomRow}px`;
      rec.style.left = `${face.leftCol}px`;
      // appends it to the designated place.
      wrapper = document.querySelector('.Tilt-inner-diff');
      wrapper.appendChild(rec);
    }
  }


  calculateFaceLocation = (data) => {
    // an array of objects defining the location of faces
    const face = data.outputs[0].data.regions.map(item => {
      return item.region_info.bounding_box;
    })
    // an image(the image user input to display)
    const faceRectangle = document.getElementById("faceRectangle");
    const width = Number(faceRectangle.width);
    const height = Number(faceRectangle.height);
    // calculates the locations of the ractangles.
    const result = face.map(obj => {
      return ({
        leftCol: obj.left_col * width,
        topRow: obj.top_row * height,
        rightCol: width - (obj.right_col * width),
        bottomRow: height - (obj.bottom_row * height),
      });
    });
    this.createBoxes(result);
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value });
  }

  onSubmit = () => {
    this.setState({ imgURL: this.state.input });
    fetch('http://10.0.0.178:8200/apicall', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input,
          }),
        })
    .then(response => response.json())
    .then(response => {
      if (response) {
        // dev -- supporting multiple face rec
        fetch('http://localhost:8200/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entry: count}));
        })
        .catch(console.log);
      }
      this.calculateFaceLocation(response)})
        .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    // clears out user data
    if (route === 'signin') {
      this.setState(initState);
    }
    this.setState({route: route});
  }

  componentDidMount() {
    this.vantaEffect = WAVES({
      el: this.vantaRef.current,
      THREE: THREE,
      color: 0x147F64,
      waveHeight: 30,
      shininess: 0,
      waveSpeed: 0.6,
      zoom: 0.75,
    })
  }

  componentWillUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }
  
  render() {
      return (
        <div ref={this.vantaRef} className="App">
          { this.state.route === 'home'
          ? <div className = 'home-card'>
              <Navigation onRouteChange={ this.onRouteChange } />
              <Logo />
              <Rank name={this.state.user.name} entry={this.state.user.entry} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmit={this.onSubmit} 
              />
              <FaceRecognition imgURL={this.state.imgURL} /> 
            </div>
          : (
            this.state.route === 'signin'
            ? <SignIn onRouteChange={ this.onRouteChange } loadUser={this.loadUser}/>
            : (
              this.state.route === 'hello'
            ? <Hello onRouteChange={ this.onRouteChange }/>
            : <Register onRouteChange={ this.onRouteChange } loadUser={this.loadUser} />)
            )
          }
        </div>
    );
  }
}

export default App;
