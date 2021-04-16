import React from 'react';

function Buttons({ id, className, value, onClick }) {
    return (
        <button
            id={id}
            className={className}
            onClick={onClick}>
            {value}
        </button>
    )
}

export default Buttons