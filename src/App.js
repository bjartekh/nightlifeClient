import React, { Component, ReactDOM } from 'react';
import Map, { Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow : true,
      activeMarker: {},
      selectedPlace: {},
      position : {}

    }
  }

  fetchPlaces(mapProps, map) {
    console.log("fetchplaces is here");
    console.log(mapProps);
    console.log(map);

    const {google} = mapProps;
    /*const service = new google.maps.places.PlacesService(map);*/
  }

  onMarkerClick(props, marker, e) {
    console.log("clicked");
    console.log(props);
    this.state = {
      selectedPlace : props,
      activeMarker : marker,
      showingInfoWindow : true
    }
  }
  windowHasOpened(e) {

    console.log("window open")
  }

  onMapclicked(props) {
    if(this.state.showingInfoWindow) {
      this.state = {
        showingInfoWindow : false,
        activeMarker : null
      }
    }
  }

  componentDidMount() {
      this.renderAutoComplete();
    }

  componentDidUpdate(prevProps) {
    const {google, map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }

  onSubmit(e) {
   e.preventDefault();
 }

  renderAutoComplete() {
    console.log("render autocomplete");
      const {google, map} = this.props;

      console.log(google);
      console.log(map);
      if (!google || !map) return;

      const aref = this.refs.autocomplete;
      const node = ReactDOM.findDOMNode(aref);
      console.log(node);
      var autocomplete = new google.maps.places.Autocomplete(node);
      autocomplete.bindTo('bounds', map);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        this.setState({
          place: place,
          position: place.geometry.location
        })
      })
    }

  render() {
     const props = this.props;
     const {google} = this.props;
     const {position} = this.state;
     console.log(props);
    return (
      <div className="container">
      <div className="row">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Guiness travel guide</h2>
        </div>


        <form onSubmit={this.onSubmit}>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">Location</span>
              <input type="text" ref="autocomplete" className="form-control" placeholder="Enter a location" aria-describedby="basic-addon1" />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">Go!</button>
              </span>
          </div>
        </form>
        <div className="row">
        <Map google={window.google}  containerStyle={{
                position: 'relative',
                height: '100vh',
                width: '100%'
              }} zoom={14} onReady={(e) => this.fetchPlaces(e, window.google)} >
          <Marker onClick={(e) => this.onMarkerClick(e)}
                 name={'Current location'} />
          </Map>
        </div>
      </div>
      </div>

    );
  }
}

export default App;
