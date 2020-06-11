import React from 'react';

import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Activity = (props) => {
    if (props.activity === undefined) {
        return 'loading...'
    } else {

        let numb = parseFloat((props.activity.value / 1000000).toFixed(0));

        return (
            <div className="py-3 row no-gutters">
                <div className="col-7 text-left">
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
                <div className="col-5">
                    <FontAwesomeIcon
                        icon={props.icon}
                        size='3x'
                        color={props.iconColor}
                    />
                </div>
            </div>
        );
    }
}

export default Activity;
