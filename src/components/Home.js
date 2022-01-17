import React, { useState, useEffect } from 'react';
import './css/home.css';
import DailyPhoto from "./DailyPhoto.js";
import PhotoForm from "./PhotoForm";

const apiKey = process.env.REACT_APP_SPACE_POD_KEY;

const Home = () => {

    //states and data to be passed to DailyPhoto component, handling initial fetch of todays photo
    const [photoData, setPhotoData] = useState(null);
    useEffect(() => {
        fetchData();

        async function fetchData () {
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
            const data = await res.json();
            setPhotoData(data);
        }
    }, []);

    //states, functions, and data to be passed to PhotoForm component

    //states and functions for handling date inputs
    const [fromDate, setFromDate] = useState({ selectedDay: undefined });
    const [toDate, setToDate] = useState({ selectedDay: undefined });
    const [photoArray, setPhotoArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState();

    const handleFromDate = (day) => {
        setFromDate({ selectedDay: day });    
    }

    const handleToDate = (day) => {
        setToDate({ selectedDay: day });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let queryFromDate = '';
        let queryToDate = '';

        setPhotoArray([]);

        const defineFromQuery = () => {
            //setting from date to a format that can be sent to API for image retrieval
            const selectedFromDate = fromDate.selectedDay;
            const fromMonth = (selectedFromDate.getMonth() + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            const fromDay = (selectedFromDate.getDate()).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            const fromYear = selectedFromDate.getFullYear();
            queryFromDate = `${fromYear}-${fromMonth}-${fromDay}`;
        }

        const defineToQuery = () => {
            const selectedToDate = toDate.selectedDay;
            const toMonth = (selectedToDate.getMonth() + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            const toDay = (selectedToDate.getDate()).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            const toYear = selectedToDate.getFullYear();
            queryToDate = `${toYear}-${toMonth}-${toDay}`;
        }

        let tempPhotoObject = {
            photoData: null,
            liked: false
        }
        let tempPhotoArray = [];

        async function fetchImages (queryParams) {
            let url = `https://api.nasa.gov/planetary/apod?${queryParams}&api_key=${apiKey}`;

            const res = await fetch(url)
            const data = await res.json();
            for (let dataSet of data) {
                tempPhotoObject.photoData = dataSet
                tempPhotoArray.push(tempPhotoObject);
                tempPhotoObject = {
                    photoData: null,
                    liked: false
                }
            }
            savePhotoData(tempPhotoArray);
        }

        const savePhotoData = (array) => {
            setPhotoArray(array);
            tempPhotoArray = [];
            }
            tempPhotoObject = {
                photoData: null,
                liked: false
            }
        

        if(fromDate.selectedDay === undefined || toDate.selectedDay === undefined){
            setErrorMessage('Please select a from date for your search')
        }else if(fromDate.selectedDay > toDate.selectedDay) {
            setErrorMessage('From date must come before To date')
        }else if(fromDate.selectedDay > new Date() || toDate.selectedDay > new Date()){
            setErrorMessage('Selected days must be before todays date')
        }else{
            setErrorMessage();
            defineFromQuery();
            defineToQuery();
            fetchImages(`start_date=${queryFromDate}&end_date=${queryToDate}`);
        }
    }

    return (
        <main>
            <div className="main-container">
                <section>
                    <h1 className="row">Space P.O.D.</h1>
                    <p className="row">Get a glimpse into NASA's photo of the day!</p>
                    <DailyPhoto photoData={photoData} />
                </section>
                <section>
                    <PhotoForm 
                        handleFromDate={handleFromDate}
                        handleToDate={handleToDate}
                        handleSubmit={handleSubmit}
                    />
                </section>
                <section>
                    {
                    photoArray.map((item, index) => {
                        console.log('photoArray in JSX: ',photoArray)
                        let itemData = item.photoData
                        return(
                            <img key={index} src={itemData.url} alt={itemData.title}></img>
                        )
                    })
                    }
                </section>
            </div>
        </main>
    );
}

export default Home;