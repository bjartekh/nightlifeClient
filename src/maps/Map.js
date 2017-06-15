import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Map extends Component {
  constructor(props) {
    super(props);
    console.log(props.google);
    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      place: null
    }
  }


  componentDidUpdate(prevProps, prevState) {
    console.log("did update");
    if(prevProps.google !== this.props.google)
    {
      this.initMap()
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
        this.recenterMap();
    }


  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;
    if(map) {
      let center = new maps.LatLng(curr.lat, curr.lng);
      map.panTo(center);
    }

  }

  componentDidMount() {
    if(navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        })
      })
    }
    this.initMap();
  }

  initMap() {
    if(this.props && this.props.google)
    {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      console.log(node);

      let {initialCenter, zoom } = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      });
      this.map = new maps.Map(node, mapConfig);

      const aref = this.refs.autocomplete;
      const autoNode = ReactDOM.findDOMNode(aref);
      var autocomplete = new maps.places.Autocomplete(autoNode);
      autocomplete.bindTo('bounds', this.map);

      autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log(place);
            if (!place.geometry) {
              return;
            }
      });


      /*maps.event.trigger(this.map, 'ready');*/
       this.forceUpdate();
    }
  }


  renderChildren() {
        const {children} = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
          return React.cloneElement(c, {
            map: this.map,
            google: this.props.google,
            mapCenter: this.state.currentLocation
          });
        })
      }

  render() {
    return (
      <div>
      <form onSubmit={this.onSubmit}>
                <input
                  ref='autocomplete'
                  type="text"
                  placeholder="Enter a location" />
                <input
                  type='submit'
                  value='Go' />
              </form>
      <div style={this.props.style} ref="map">
        Loading map...
      </div>
        {this.renderChildren()}
      </div>
    )
  }
}

Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object
}

Map.defaultProps = {
  zoom: 13,
  // San Francisco, by default
  initialCenter: {
    lat: 60.397076,
    lng: 5.324383
  }
}

export default Map;
