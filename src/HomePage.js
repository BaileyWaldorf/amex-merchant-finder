import React, { Component } from 'react';
import './App.css';
import Searchbar from'./Searchbar';
import Results from './Results';

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      long: '',
      merchants: {},
      loadedMerchants: false,
      submitted: false,
      header: "Type your address."
    };
  }

  submitLocation = () => {
    this.setState({submitted: true, header: "Check out what we've found."})
  }

  resubmit = () => {
    this.setState({submitted: false, header: "Type your address.", loadedMerchants: false})
  }

  LatLng = (lat, long) => {
    this.setState({lat, long}, () => {
      console.log("set lat long")
      let URL = `https://bdaas.americanexpress.com/api/servicing/v1/maps/?&lat_lng=${lat},${long}&country_code=US&page_size=30`
      fetch(PROXY_URL + URL, {
        method: 'GET',
        headers:{
        'X-Requested-With': 'XMLHttpRequest'
      }})
        .then(response => response.json())
        .then(response => this.setState({ merchants: response, loadedMerchants: true }, () => {
          console.log("merchants = ", this.state.merchants)
        }))
    })
  }

  render() {
    return (
      <div className="app">
        <div className={this.state.submitted ? "header-submit" : "header"}>
          <h1>{this.state.header}</h1>
          <Searchbar LatLng={this.LatLng} submitLocation={this.submitLocation} resubmit={this.resubmit}/>
        </div>
        {this.state.loadedMerchants ? <Results merchants={this.state.merchants.merchants}/> : null}
      </div>
    );
  }
}

export default HomePage;
