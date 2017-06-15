import React, { Component } from 'react';
import Map from './Map';
import Marker from './Marker';

/*
  TODO: create dynamic component which renders all markers within viewpoint
*/
class Container extends Component {
  constructor(props) {
    super(props);
  }
render() {
    const style = {
      height: '100vh'
    }

    const pos = {lat: 60.397076, lng: 5.324383}

    return (
      <div className="container">
      <h1>Guinness Travel Guide<small> - the place for guinness lovers</small></h1>
      <div className="row">
          <Map style={style} google={this.props.google} >
            <Marker position={pos} />
          </Map>
        </div>
      </div>
    )
  }
}
export default Container;
