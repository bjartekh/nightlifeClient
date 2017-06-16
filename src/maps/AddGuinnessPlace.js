import React, { Component } from 'react';
import Map from './Map';

class AddGuinnessPlace extends Component {
  constructor(props) {
    super(props);
    this.google = props.google;
    this.state = {
      venueName : "",
      onTap : true
    }
  }

handleChange(e) {
    const target = e.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;
     this.setState({
        [name]: value
        });

}


render() {
  const style = {
    height: '300px'
  }

  const pos = {lat: 60.397076, lng: 5.324383};


  return(
    <div>

    <form>
        <div className="form-group">
            <label for="pubname">Pubname</label>
            <input name="venueName" className="form-control"
                  type="text"
                  placeholder="Name of Guinness place / pub / venue" id="pubname" value={this.state.venueName} onChange={(e) => this.handleChange(e)} />
          </div>
          <div className="checkbox">
            <label>
              <input name="onTap" type="checkbox"  checked={this.state.onTap} onChange={(e) => this.handleChange(e)} /> Guinness on tap?
            </label>
          </div>
      </form>
      <Map style={style} google={this.google} >
      </Map>
      <hr />
      <div className="form-group">
          <button type="submit" className="btn btn-primary">Add Guinness venue</button><small> * Must be signed in </small>
      </div>
    </div>

  )
}

}

export default AddGuinnessPlace;
