import React, {Component} from 'react';
import './App.css';
import request from 'request';
import fetch from "isomorphic-fetch";
import {compose, withProps} from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

const MapWithAMarkerClusterer = compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA9NbDX2FY3k58xzkTg_BCicc1IJ_rfJH0&v=3.exp&libraries=geometry,drawing,places", loadingElement: <div style={{
    height: `100%`
  }}/>,
  containerElement: <div style={{
    height: `400px`
  }}/>,
  mapElement: <div style={{
      height: `180%`
    }}/>
}), withScriptjs, withGoogleMap)(props => <GoogleMap defaultZoom={12} defaultCenter={{
  lat: 48.8534100,
  lng: 2.3488000
}}>
  <MarkerClusterer averageCenter enableRetinaIcons gridSize={50}>
    {props.markers.map(marker => (<Marker key={marker.number} position={{
      lat: marker.position.lat,
      lng: marker.position.lng
    }}

    />))}

  </MarkerClusterer>

</GoogleMap>);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <DemoApp/>
      </div>
    );
  }
}
class DemoApp extends React.PureComponent {
  componentWillMount() {
    this.setState({markers: [], available_bikes:0, available_bike_stands:0})
  }

  componentDidMount() {
    const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=092c2f21c6cc8c7e4363bd5939abb7967960291d'

    fetch(url).then(res => res.json()).then(data => {
      this.setState({markers: data });
    });
  }

  render() {
    return (
      <div>
        <header>
          <img src="http://blog.velib.paris.fr/wp-content/themes/velib_v2/images/logo-velib.png"></img>
        </header>
        <div className='map'>
          <MapWithAMarkerClusterer markers={this.state.markers} />
        </div>

        <div className="infoRow">

          <div>
            <img src="http://www.icone-png.com/png/10/10371.png"/>
            <h2 id='Bike'></h2>
          </div>
          <div>
            <img src="http://latoll-angers.fr/images/common/magasins/70/logo_70.png"/>
            <h2 id='Place'>-</h2>
          </div>

        </div>

      </div>
    )
  }
}

export default App;
