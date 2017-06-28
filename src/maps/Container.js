import React, { Component } from 'react';
import Map from './Map';
import AddPlace from './AddPlace';
import Marker from './Marker';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
      <div className="row">
      <div className="nav">
      <Tabs>
        <TabList>
          <Tab>Find</Tab>
          <Tab>Nearby</Tab>
          <Tab>Add</Tab>
          <Tab>Sign In</Tab>
        </TabList>

        <TabPanel forceRender={true}>
          <Map style={style} google={this.props.google} >
            
          </Map>
        </TabPanel>
        <TabPanel>
          <h2>Nearby</h2>
        </TabPanel>
        <TabPanel>
          <h2>Add a place</h2>
          <AddPlace google={this.props.google} />
        </TabPanel>

        <TabPanel>
          <h2>Sign in</h2>
          <p>Use google</p>
          <p>Use facebook</p>
        </TabPanel>

     </Tabs>
     </div>

        </div>
      </div>
    )
  }
}
export default Container;
