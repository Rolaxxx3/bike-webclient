import React from 'react';

import './SelectField.css';

function SelectField(props) {
    const options = props.options.map((item, i) => 
        <option key={i}>{item}</option>
    );
    return (
        <div className={props.className}>
            <div className="select-field">
                {
                    props.label
                        ? <span className="select-field__label">{props.label || ''}</span>
                        : null
                }
                <select className="select-field__select">{options}</select>
            </div>
        </div>
    )
}

export default SelectField;
