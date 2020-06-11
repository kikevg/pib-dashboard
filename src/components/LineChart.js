import React from 'react';

import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
    return (
        <div>
            <Line
                data={props.data}
                options={props.options}
                width={200}
            />
        </div>
    );
}

export default LineChart;
