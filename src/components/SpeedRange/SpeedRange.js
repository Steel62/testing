import React from 'react';
import './speedRange.css';

export default function SpeedRange(props) {
    return(
        <div className='speedRange'>
            <p>Скорость спутников</p>
            <p>Спутник 1</p>
            <input id='satellite1' type="range" min = {0.50} max={1.30} value={props.values.satellite1} step={0.01}
                   onChange={props.onChange}/>
            <p>Спутник 2</p>
            <input id='satellite2' type="range" min = {0.50} max={1.30} value={props.values.satellite2} step={0.01}
                   onChange={props.onChange}/>
            <p>Спутник 3</p>
            <input id='satellite3' type="range" min = {0.50} max={1.30} value={props.values.satellite3} step={0.01}
                   onChange={props.onChange}/>
            <p>Спутник 4</p>
            <input id='satellite4' type="range" min = {0.50} max={1.30} value={props.values.satellite4} step={0.01}
                   onChange={props.onChange}/>

        </div>
    );
}

