import React from 'react';

const Option = (props) => (
    <div className="option">
        <p className="option-text">{props.count}. <span>{props.optionText}</span></p>
        <button 
            className="link"
            onClick={(e) => {
                props.handleDeleteOption(props.optionText);
            }}>
            Remove
        </button>
    </div>
);


export default Option;
