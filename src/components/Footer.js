import React from 'react';

import economy from '../img/economy.png';
import logo from '../img/logo.png';

const Footer = (props) => {
    return (
        <footer className="pt-5">

            <div className="row align-items-stretch">
                <div className='col-sm-12 col-md-6' id="economy">
                    <img src={economy} className="img-fluid" alt="economy img" />
                </div>
                <div className='col-sm-12 col-md-6 d-flex align-items-center' id="logo">
                    <img src={logo} className="d-block m-auto" width={300} alt="logo img" />
                </div>
            </div>
            <br />
            <br />
            <span className="d-block text-center text-muted">
                Fuente: <a href="https://www.worldbank.org">Banco Mundial</a>
            </span>
            <span className="d-block text-center text-muted">Desarrollado por Facultad de Economía, Universidad de Oriente</span>
        </footer>
    );
}

export default Footer;
