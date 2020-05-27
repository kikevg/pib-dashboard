import React from 'react';

import Button from 'react-bootstrap/Button';

const Header = (props) => {

    return (
        <div className="d-flex align-items-start justify-content-between">
            <div>
                <span className="font-size-small text-muted text-capitalize">dashboard</span>
                <h2 className="font-weight-bold text-primary">PIB Centro America</h2>
            </div>
            <div>
                <Button
                    variant="transparent"
                    className="d-flex align-items-center ml-auto p-0"
                    onClick={props.onClick}
                >
                    <span className="font-size-small text-secondary">Tema: </span>
                    &nbsp;
                    <span id="bg-theme"></span>
                </Button>
                <span className="font-size-small text-secondary">Ultima actualización: {props.lastupdate}</span>
            </div>
        </div>
    );
}

export default Header;
