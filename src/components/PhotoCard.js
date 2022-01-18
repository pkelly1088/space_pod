import React from 'react';
import './css/photoCard.css'

const PhotoCard = (props) => {
    return(
        <div key={props.index.toString()} className="photo-card">
            <div className="img-container">
                {props.itemData.media_type === 'image' 
                ? <img src={props.itemData.url} alt={props.itemData.title} className="photo"></img>
                : <iframes
                className="photo" 
                src={props.itemData.url}
                frameBorder="0"
                gesture="media"
                allow="encrypted-media"
                allowFullScreen></iframes>}
            </div>
            <div className="info-container">
                <h3>{props.itemData.title}</h3>
                <p>Date: {props.itemData.date}</p>
                <p>{props.itemData.explanation}</p>
                {props.itemData.copyright 
                ? <p className="credit">Credit: {props.itemData.copyright}</p>
                : <p></p>}
                {props.itemLiked === true
                ? <button className="unlike-btn" onClick={() => props.handleUnlike(props.index)}>Unlike</button>
                : <button onClick={() => props.handleLike(props.index)}>Like</button>}
                
            </div>
        </div>
    )
}

export default PhotoCard;