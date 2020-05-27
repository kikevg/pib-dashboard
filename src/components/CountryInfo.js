import React from 'react';

import CountUp from 'react-countup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const CountryInfo = (props) => {

    if (props.country === undefined) {
        return 'loading...';
    } else {

        let growthClasses = 'd-block text-success';
        let icon = faSortUp;
        let plus = '+';

        if (props.country.growth < 0) {
            growthClasses = 'd-block text-danger';
            icon = faSortDown;
            plus = '';
        }

        let numb = parseFloat((props.country.value / 1000000).toFixed(0));
        let growth = parseFloat(props.country.growth);
        
        return (
            <div className="d-flex align-items-center justify-content-between">
                <h4 className="d-block font-weight-bold text-primary">
                    $<CountUp
                        start={0}
                        end={numb}
                        duration={2}
                        separator=','
                    />
                    M
                </h4>
                <div className="text-right">
                    <span className={growthClasses}>
                        {plus}
                        <CountUp
                            start={0}
                            end={growth}
                            duration={2}
                            separator='.'
                            decimals={1}
                        />%
                        <FontAwesomeIcon icon={icon} />
                    </span>
                    <span className="text-secondary font-size-">{props.country.name}</span>
                </div>
            </div>
        );
    }

}

export default CountryInfo;
