import React, { Component } from 'react';

class Marker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    console.log("Marker componentDidUpdate");
    if((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      console.log("test");
      this.showMarker();
    }
  }

  componentDidMount() {
      this.showMarker();
    }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  showMarker() {
    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);
    console.log("position:", position);


    var iconImage = 'http://localhost:3000/marker_red.png';
    const pref = {
      map: map,
      position: position,
      title: "Guinness",
      icon: iconImage

    };

    this.marker = new google.maps.Marker(pref);
  }


  render() {
    return null;
  }
}

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}

export default Marker;
