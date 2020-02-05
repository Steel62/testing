import React from 'react';

export default function SpeedRange(props) {
    return(
        <div className='speedRange'>
            <input id='satellite1' type="range" min = {0.20} max={1.20} value={props.values.satellite1} step={0.01} onChange={props.onChange}/>
            <input id='satellite2' type="range" min = {0.20} max={1.20} value={props.values.satellite2} step={0.01} onChange={props.onChange}/>
            <input id='satellite3' type="range" min = {0.20} max={1.20} value={props.values.satellite3} step={0.01} onChange={props.onChange}/>
            <input id='satellite4' type="range" min = {0.20} max={1.20} value={props.values.satellite4} step={0.01} onChange={props.onChange}/>

        </div>
    );
}

