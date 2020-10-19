import React, { Component } from 'react';
import InputField from '../../fields/InputField';
import SelectField from '../../fields/SelectField';

import './RentForm.css';

import BIKE_TYPES from '../../../constants/BIKE_TYPES'

import api from '../../../helpers/ApiCaller'


class RentForm extends Component {
    state = {
        form: {
            name: '',
            type: BIKE_TYPES[0],
            price: 0,
        }
    };

    submit = (e) => {
        e.preventDefault();
        if (this.formValidator()) {
            return;
        } else {
            const form = this.state.form;
            api.post('/bikes', {
                name: form.name,
                type: form.type,
                rent: {
                    price: form.price
                }
            });
        }
    }

    formValidator = () => {
        const form = this.state.form;
        return (
            form.name.length > 0 &&
            //form.name instanceof String &&
            form.type.length > 0 &&
            //form.type instanceof String &&
            form.price > 0 //&&
            //form.price instanceof Number
        )
    }

    change = (fieldName) => (event) => {
        const stateChanger = {};
        stateChanger[`form.${fieldName}`] = event.target.value;
        this.setState(stateChanger);
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
                    onChange={this.change('form.name')}
                />
                <SelectField
                    className="rent-form__type-field"
                    options={BIKE_TYPES}
                    label="Bike type"
                />
                <InputField
                    className="rent-form__price-field"
                    type="number"
                    label="Rent price"
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