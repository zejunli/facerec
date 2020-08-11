import React, {Component} from 'react';
import './style/css/App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import * as THREE from 'three';
import WAVES from './vanta.waves.min.js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '4c0175018bc14b0eb6211605a04cc973',
});

class App extends Component {
  constructor() {
    super()
    this.vantaRef = React.createRef()
    this.state = {
      input: '',
      imgURL: '',
      box: {},
      route: 'signin',
    }
  }

  calculateFaceLocation = (data) => {
    // an object
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    // an image(the image user input to display)
    const faceRectangle = document.getElementById("faceRectangle");
    const width = Number(faceRectangle.width);
    const height = Number(faceRectangle.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState( {
      box: box,
    })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value });
  }

  onSubmit = () => {
    this.setState({ imgURL: this.state.input });
    app.models.predict(
      // for face detection model, the alias somehow is not working.
      "53e1df302c079b3db8a0a36033ed2d15", 
      this.state.input,
      )
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({ route: route })
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
          ? <div>
              <Navigation onRouteChange={ this.onRouteChange } />
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmit={this.onSubmit} 
              />
              <FaceRecognition box={this.state.box} imgURL={this.state.imgURL} /> 
            </div>
          : (
            this.state.route === 'signin'
            ? <SignIn onRouteChange={ this.onRouteChange }/>
            : <Register />
            )
          }
        </div>
    );
  }
}

export default App;
