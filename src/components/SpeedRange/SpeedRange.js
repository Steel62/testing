import React from 'react';
import './speedRange.css';

export default function SpeedRange(props) {
    let SpeedRange = [];
    for (let key in props.values){
        SpeedRange.push(
            <div key={key}>
            <p>Спутник {key[9]}</p>
            <input id={key}
                   type="range"
                   min = {0.50}
                   max={1.30}
                   value={props.values[key].speed}
                   step={0.01}
                   onChange={props.onChange}/>
            </div>
        );
    }

    return(
        <div className='speedRange'>
            <p>Скорость спутников</p>
            {SpeedRange}
        </div>
    );
}

