import React, { Component } from 'react';
import InputField from '../../fields/InputField';
import SelectField from '../../fields/SelectField';

import './RentForm.css';

import BIKE_TYPES from '../../../constants/BIKE_TYPES'

import api from '../../../helpers/ApiCaller'
import mongoObjectId from '../../../helpers/mongoObjectId'

class RentForm extends Component {
    state = {
        form: {
            name: '',
            type: "0",
            price: 0,
        }
    };

    submit = async (e) => {
        e.preventDefault();
        if (this.formValidator()) {
            return;
        } else {
            const _id = mongoObjectId();
            const form = this.state.form;
            api.post('/bikes', {
                name: form.name,
                type: parseInt(form.type),
                rent: {
                    price: Number(form.price),
                },
                _id,
            });
            this.props.onSubmit(
                {
                    name: form.name,
                    type: parseInt(form.type),
                    rent: {
                        price: Number(form.price),
                    },
                    _id,
                },
                this.props.bikesList.length
            );
            this.setState({
                form: {
                    name: '',
                    type: "0",
                    price: 0,
                }
            });
        }
    }

    formValidator = () => {
        const form = this.state.form;
        return !(
            form.name.length > 0 &&
            typeof form.name === 'string' &&
            form.type.length > 0 &&
            typeof form.type === 'string' &&
            form.price > 0 &&
            typeof form.price === 'string'
        )
    }

    change = (fieldName) => (event) => {
        const newState = Object.assign({}, this.state);
        newState.form[`${fieldName}`] = event.target.value;

        this.setState(newState);

        return;
    }

    render() {
        return (
            <form
                className="rent-form"
                onSubmit={this.submit}
            >
                <InputField
                    className="rent-form__name-field"
                    type="text"
                    label="Bike name"
                    onChange={this.change('name', true)}
                    value={this.state.form.name}
                />
                <SelectField
                    className="rent-form__type-field"
                    options={BIKE_TYPES}
                    label="Bike type"
                    onChange={this.change('type')}
                    value={this.state.form.type}
                />
                <InputField
                    className="rent-form__price-field"
                    type="number"
                    label="Rent price"
                    step="0.01"
                    onChange={this.change('price', true)}
                    value={this.state.form.price}
                />
                <button
                    className="rent-form__submit-btn"
                    type="submit"
                >
                    Submit rent
                </button>
            </form>
        )
    }
}

export default RentForm;
