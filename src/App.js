import React, { Component } from 'react';
import RentForm from './components/forms/RentForm';

import './App.css';
import BikesList from './components/lists/BikesList';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addBike } from './store/actionCreators/bikeCreator'

import api from './helpers/ApiCaller'

import BIKE_LIST_TYPES from './constants/BIKE_LIST_TYPES'

class App extends Component {
  state = {
    rentedBikes: [],
    availableBikes: [],
    rentedTotalPrice: 0,
    availableCount: 0,
  };
  async componentDidMount() {
    try {
      const { data } = await api.get('/bikes');
      if (data instanceof Array) {
        for (const bike of data)
          this.props.addBike(bike);
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  static getDerivedStateFromProps (props) {
    const getBikesByStatus = status => {
      return props.bikes.filter(bike => {
        if (
          status === BIKE_LIST_TYPES.available &&
          bike.rent.end_date === bike.rent.start_date
        ) {
          return bike;
        }
        if (
          status === BIKE_LIST_TYPES.rented &&
          bike.rent.end_date !== bike.rent.start_date
        ) {
          return bike;
        }
        return null;
      });
    };

    const getRentedBikesPrice = (bikes) => {
      let result = 0;
      if (bikes.length) {
        for (const bike of bikes) {
          result += bike.rent.price;
        }
      }
      return result.toFixed(2);
    }

    const rentedBikes = getBikesByStatus(BIKE_LIST_TYPES.rented);
    const availableBikes = getBikesByStatus(BIKE_LIST_TYPES.available);

    return {
      rentedBikes: rentedBikes,
      availableBikes : availableBikes,
      rentedTotalPrice: getRentedBikesPrice(rentedBikes),
      availableCount: availableBikes.length,
    }
  }

  render() {
    return (
      <div className="app">
        <h1 className="app__title">Awesome Bike Rental</h1>
        <h2 className="app__subtitle">
          <img
            className="app__subtitle-emoji"
            alt="money-mouth"
            src={require("./static/emoji/money-mouth.png")}
          />&nbsp;Create new rent
        </h2>
        <RentForm
          onSubmit={this.props.addBike}
          bikesList={this.props.bikes}
        />
        <h2 className="app__subtitle">
          <img
            className="app__subtitle-emoji"
            alt="star-struck"
            src={require("./static/emoji/star-struck.png")}
          />&nbsp;Your rent (Total: ${this.state.rentedTotalPrice})
        </h2>
        <BikesList
          value={this.state.rentedBikes}
          type={BIKE_LIST_TYPES.rented}
        />
        <h2 className="app__subtitle">
          <img
            className="app__subtitle-emoji"
            alt="bicycle"
            src={require("./static/emoji/bicycle.png")}
          />&nbsp;Available bicycles ({this.state.availableCount})
        </h2>
        <BikesList
          value={this.state.availableBikes}
          type={BIKE_LIST_TYPES.available}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    bikes: state.bikes
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addBike }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
