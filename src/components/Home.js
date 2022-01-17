import React, { useState, useEffect } from 'react';
import './css/home.css';
import DailyPhoto from "./DailyPhoto.js";
import PhotoForm from "./PhotoForm";

const apiKey = process.env.REACT_APP_SPACE_POD_KEY;

const Home = () => {

    //<---SECTION FOR DAILY PHOTO COMPONENT: states and data to be passed to DailyPhoto component, handling initial fetch of todays photo---->
    const [photoData, setPhotoData] = useState(null);
    useEffect(() => {
        fetchData();

        async function fetchData () {
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
            const data = await res.json();
            setPhotoData(data);
        }
    }, []);

    //<----SECTION FOR PHOTO FORM COMPONENT: states, functions, and data to be passed to PhotoForm component--->

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

    //function for handing search of dates for photos
    const handleSubmit = (e) => {
        //prevent default of button click and setting date variables
        e.preventDefault();
        let queryFromDate = '';
        let queryToDate = '';

        //clearing the existing photo array so new search will fill array
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

        //setting to date to a format that can be sent to API for image retrieval
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

        // tempo object and array for storing photo info retieved from api before setting photoArray state
        let tempPhotoObject = {
            photoData: null,
            liked: false
        }
        let tempPhotoArray = [];

        //function for getting data from api
        async function fetchImages (queryParams) {
            //setting url with params passed by user and key passed from .env file
            let url = `https://api.nasa.gov/planetary/apod?${queryParams}&api_key=${apiKey}`;

            //fetch request with url inserted, then data formatted
            const res = await fetch(url)
            const data = await res.json();
            //data looped over to set temp object, push to temp array, then clear temp object for reuse
            for (let dataSet of data) {
                tempPhotoObject.photoData = dataSet
                tempPhotoArray.push(tempPhotoObject);
                tempPhotoObject = {
                    photoData: null,
                    liked: false
                }
            }
            //sending temp array to save photo function after all objects in array from api are saved in the temp array
            savePhotoData(tempPhotoArray);
        }

        //this function sets the photoArray state so it can be displayed on the screen and clears teh temp photo object and temp photo array for reuse
        const savePhotoData = (array) => {
            setPhotoArray(array);
            tempPhotoArray = [];
            }
            tempPhotoObject = {
                photoData: null,
                liked: false
            }
        
        //conditional code that checks the user input and verified before sending request to api or giving user a warming
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

    //<---SECTION FOR PHOTOCARD COMPONENT: states and functions for photo cards --->

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