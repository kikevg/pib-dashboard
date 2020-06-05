import React from 'react';

import CountUp from 'react-countup';

const Activity = (props) => {
    if (props.activity === undefined) {
        return 'loading...'
    } else {

        let numb = parseFloat((props.activity.value / 1000000).toFixed(0));
        
        return (
            <div className="py-3">
                <h4 className="text-primary font-weight-bold">
                    $<CountUp
                        start={0}
                        end={numb}
                        duration={2}
                        separator=','
                    />M
                </h4>
                <span className="text-secondary font-weight-light">{props.activity.name}</span>
            </div>
        );
    }
}

export default Activity;
