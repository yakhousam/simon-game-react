import React from 'react';

export default function ButtonControl(props){
    return(
        <div className='button-wraper'>
            <button className="btn-ctrl" onClick={props.onClick}></button>
            <p>{props.title}</p>
        </div>
    )
}