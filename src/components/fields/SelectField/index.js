import React, { Component } from 'react';

import './SelectField.css';

class SelectField extends Component {
    render() {
        const options = this.props.options.map((item, i) => 
            <option
                key={item.id}
                value={item.id}
            >
                {item.value}
            </option>
        );
        return (
            <div className={this.props.className}>
                <div className="select-field">
                    {
                        this.props.label
                            ? <span className="select-field__label">{this.props.label || ''}</span>
                            : null
                    }
                    <select
                        className="select-field__select"
                        value={this.props.value}
                        onChange={this.props.onChange}
                    >
                        {options}
                    </select>
                </div>
            </div>
        )
    }
}

export default SelectField;
