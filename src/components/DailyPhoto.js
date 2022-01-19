import React from 'react';
import './css/dailyPhoto.css'

const DailyPhoto = (props) => {

    if(!props.photoData) return <div />;

    return (
        <div className="row daily-intro">
            <div className='column-one-third daily-writeup'>
            <h1 className="site-title">Space <span className="pod">P.O.D.</span></h1>
                    <p>Welcome to Space P.O.D. (photo of the day) where you can search through NASA's history of Astronomy Picture of the Day and find and like images to save them for later, like this photo of {props.photoData.title}, credited to {props.photoData.copyright}.</p>
                    <p>Use the photo search below to find pictures you like. Like them to save them to the My Liked Photos page and then see all your favorite photos in one place!</p>
            </div>
            <div className='column-two-thirds'>
                <div className='img-container'>
                    <img src={props.photoData.url} alt={props.photoData.title}></img>
                </div>
            </div>
        </div>
    )
}

export default DailyPhoto;