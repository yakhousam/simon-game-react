import React from 'react';

export default function ButtonControl(props){
    return(
        <div className='button-wraper'>
            <button className="btn-ctrl" style={props.style} onClick={props.onClick}></button>
            <p>{props.title}</p>
        </div>
    )
}