import React from 'react';

const DailyPhoto = (props) => {

    if(!props.photoData) return <div />;

    return (
        <div>
            <h2>Todays Photo: {props.photoData.title}</h2>
            <img src={props.photoData.url} alt={props.photoData.title}></img>
            <p>{props.photoData.date}</p>
            <p>{props.photoData.explanation}</p>
            <p>{props.photoData.copyright}</p> 
        </div>
    )
}

export default DailyPhoto;