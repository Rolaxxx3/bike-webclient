import React, { Component } from 'react';

import './BikesList.css';

import { connect } from 'react-redux'
import BikeItem from '../../items/BikeItem'


class BikesList extends Component {
    list = (bikes) => {
        return bikes.map(bike => {
            return (
                <BikeItem
                    value={bike}
                    key={bike._id}
                    type={this.props.type}
                />
            )
        });
    }
    render () {
        return (
            <div className="bikes-list">
                {
                    this.props.value.length > 0
                        ? this.list(this.props.value)
                        : (
                            <div className="bikes-list__item-wrapper">
                                <span className="bikes-list__text-empty">No available items yet</span>
                            </div>
                        )
                }
            </div>
        );
    }

}

export default connect(null, null)(BikesList);
