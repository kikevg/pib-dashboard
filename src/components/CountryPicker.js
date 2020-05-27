import React from 'react';

import Form from 'react-bootstrap/Form';

const CountryPicker = (props) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label className="d-block text-secondary text-center my-3">Selecciona un país</Form.Label>
                <Form.Control as="select" onChange={props.onChange} className="border-0 w-50 m-auto">
                    {props.countries.map((c, i) => <option key={i} value={c.id} >{c.name}</option>)}
                </Form.Control>
            </Form.Group>
        </Form>
    );
}

export default CountryPicker;
