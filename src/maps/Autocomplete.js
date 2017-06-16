import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Autocomplete extends Component {
  constructor(props) {
    super(props);
    console.log("Autocomplete constructor");
    console.log(props);

  }


  componentDidUpdate() {
    console.log("Autocomplete:componentDidUpdate")
    if(this.props && this.props.google && this.props.map)
    {
      this.renderAutocomplete();
    }
  }


  componentDidMount() {
    if(this.props && this.props.google && this.props.map)
    {
      this.renderAutocomplete();
    }
  }

  renderAutocomplete() {

    console.log("starting Autocomplete");
    const {google} = this.props;
    const maps = google.maps;

    const map = this.props.map;

    const aref = this.refs.autocomplete;
    const autoNode = ReactDOM.findDOMNode(aref);
    var autocomplete = new maps.places.Autocomplete(autoNode);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          console.log("autocomplete getplace");
          console.log(place);
          if (!place.geometry) {
            return;
          }

          if(place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          this.setState({
            place: place,
            position: place.geometry.location
          })

    });
  }


  onSubmit(e) {
    e.preventDefault();
  }

  render() {


    return(
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon1">Search</span>
                <input className="form-control"
                  ref='autocomplete'
                  type="text"
                  placeholder="Enter a location and thou might be lead to a chalice of instant gratification" />

        </div>

    )
  }
}

Autocomplete.propTypes = {
  google: React.PropTypes.object,
  map: React.PropTypes.object
}


export default Autocomplete;
