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
                    min={(this.props.type === 'number') ? (this.props.min || 0) : null}
                    max={(this.props.type === 'number') ? (this.props.max || Number.MAX_SAFE_INTEGER) : null}
                    type={this.props.type || 'text'}
                    className="input-field__input"
                    value={this.props.value}
                    onChange={this.props.onChange}
                    step={this.props.step || null}
                />
            </div>
        )
    }
}

export default InputField;
