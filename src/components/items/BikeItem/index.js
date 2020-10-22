import React, { Component } from 'react';

import './BikeItem.css';

import BIKE_TYPES from '../../../constants/BIKE_TYPES'
import BIKE_LIST_TYPES from '../../../constants/BIKE_LIST_TYPES'

import { bindActionCreators } from 'redux'

import { rentBike, unrentBike, deleteBike } from '../../../store/actionCreators/bikeCreator'
import { connect } from 'react-redux'
import api from '../../../helpers/ApiCaller'
import maxStringLengthFilter from '../../../helpers/maxStringLengthFilter'

import "flatpickr/dist/themes/material_green.css";
 
import Flatpickr from "react-flatpickr";
import moment from 'moment';

class BikeItem extends Component {
    state = {
        date: moment().add(1, 'hours').add(1, 'minute').toISOString(),
    }
    async rentBike() {
        try {
            await api.patch(`/bikes/${this.props.value._id}`, {
                rent: {
                    end_date: this.state.date,
                    start_date: moment().toISOString(),
                }
            });
            this.props.rentBike(this.props.value, moment(this.state.date).toISOString());
        } catch (e) {
            console.error(e.message);
        }
    }
    async unrentBike() {
        try {
            await api.patch(`/bikes/${this.props.value._id}`, {
                rent: {
                    end_date: this.props.value.rent.start_date,
                }
            });
            this.props.unrentBike(this.props.value);
        } catch (e) {
            console.error(e.message);
        }
    }

    async deleteBike() {
        try {
            await api.delete(`/bikes/${this.props.value._id}`);
            this.props.deleteBike(this.props.value);
        } catch (e) {
            console.error(e.message);
        }
    }
    render () {
        const bikeTypeMsg = BIKE_TYPES.find(item => item.id === this.props.value.type).value
        return (
            <div className="bike-item__item-wrapper">
                    <span className="bike-item__text">
                        <span title={this.props.value.name}>
                            {maxStringLengthFilter(this.props.value.name, 20)}
                        </span>
                            {` / ${bikeTypeMsg} / $${this.props.value.rent.price.toFixed(2)}`}
                    </span>
                    {   BIKE_LIST_TYPES.available === this.props.type ? (
                            <Flatpickr
                                className="bike-item__date-pickr"
                                data-enable-time
                                value={this.state.date}
                                options={{
                                    dateFormat: "d.m.y, h:i",
                                    minDate: moment().add(1, 'hours').toISOString(),
                                    time_24hr: true,
                                }}
                                onChange={date => {
                                    this.setState({date: moment(date[0]).toISOString()});
                                }}
                            />
                        ) : <span className="bike-item__text">{moment(this.props.value.rent.end_date).format('D.M.Y, hh:mm')}</span>
                    }
                    <div className={BIKE_LIST_TYPES.rented === this.props.type ? "bike-item__button-wrapper" :"bike-item__buttons-wrapper"}>
                        {
                            this.props.type === BIKE_LIST_TYPES.available ?
                                <button
                                    className="bike-item__rent-btn"
                                    onClick={async () => this.rentBike()}
                                >
                                    Rent
                                </button>
                            : ''
                        }
                        <button
                            className="bike-item__cancel-btn"
                            onClick={async () => {
                                if (BIKE_LIST_TYPES.available === this.props.type)
                                    this.deleteBike()
                                if (BIKE_LIST_TYPES.rented === this.props.type)
                                    this.unrentBike()
                                return null;
                            }}
                        >
                            {BIKE_LIST_TYPES.rented === this.props.type ? 'Cancel rent' : 'Delete'}
                        </button>
                    </div>
            </div>
        )
    }
}


function mapDispatchToProps (dispatch) {
    return bindActionCreators({ rentBike, unrentBike, deleteBike }, dispatch);
}

export default connect(null, mapDispatchToProps)(BikeItem);
