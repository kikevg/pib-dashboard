import React from 'react';

import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
    return (
        <div>
            <Bar
                data={props.data}
                options={props.options}
                width={200}
            />
        </div>
    );
}

export default BarChart;
