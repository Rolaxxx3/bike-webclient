import React, { Component } from 'react';

import './InputField.css';

class InputField extends Component {
    render() {
        return (
            <div className={this.props.className}>
                {
                    this.props.label
                        ? <span className="input-field__label">{this.props.label || ''}</span>
                        : null
                }
                <input
                    min={this.props.min || 0}
                    max={this.props.max || Number.MAX_SAFE_INTEGER}
                    type={this.props.type || 'text'}
                    className="input-field__input"
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}

export default InputField;
