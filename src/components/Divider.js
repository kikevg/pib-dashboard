import React from 'react';

const Divider = (props) => {
    return (
        <div id="divider" className="my-5">
            <span className="text-muted font-size-small text-capitalize">{props.text}</span>
        </div>
    );
}

export default Divider;
