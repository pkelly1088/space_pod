import React, { useState, useEffect } from 'react';

const DailyPhoto = () => {
    const [photoData, setPhotoData] = useState(null);

    

    useEffect(() => {
        fetchData();

        async function fetchData () {
            const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=7NcoabzJyUSK84H41D70XmFw4XcqXItC6uYte7Q0')
            const data = await res.json();
            console.log(data);
            setPhotoData(data);
        }

    }, []);

    if(!photoData) return <div />;

    return (
        <div>
            <h2>Todays Photo: {photoData.title}</h2>
            <img src={photoData.url} alt={photoData.title}></img>
            <p>{photoData.date}</p>
            <p>{photoData.explanation}</p>
            <p>{photoData.copyright}</p> 
        </div>
    )
}

export default DailyPhoto;