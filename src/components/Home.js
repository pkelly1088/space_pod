import React, { useState, useEffect } from 'react';
import './css/home.css';
import DailyPhoto from "./DailyPhoto.js";
import PhotoForm from "./PhotoForm";
import PhotoCard from "./PhotoCard";
import Loader from "./Loader";

// const apiKey = process.env.REACT_APP_SPACE_POD_KEY;
const apiKey = '';

const Home = () => {
    // <---SECTION FOR ALL GLOBAL ITEMS --->
    const [photoArray, setPhotoArray] = useState([]);
    const [loading, setLoading] = useState(false);

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
    const [errorMessage, setErrorMessage] = useState('');

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
            //set loading to display loader while images are being retrieved from fetch
            setLoading(true);
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
            //set loading to false to remove loader from screen after images load
            setLoading(false);
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
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        if(fromDate.selectedDay === undefined || toDate.selectedDay === undefined){
            setErrorMessage('Please select both a From and To date for your search.')
        }else if(fromDate.selectedDay > toDate.selectedDay) {
            setErrorMessage('From date must come before To date.')
        }else if(fromDate.selectedDay > tomorrowDate || toDate.tomorrowDate > new Date()){
            setErrorMessage(`Selected days must be before ${(tomorrowDate.getMonth()+1)}/${tomorrowDate.getDate()}/${tomorrowDate.getFullYear()}.`)
        }else{
            setErrorMessage('');
            defineFromQuery();
            defineToQuery();
            fetchImages(`start_date=${queryFromDate}&end_date=${queryToDate}`);
        }
    }

    //<---SECTION FOR PHOTOCARD COMPONENT: states and functions for photo cards --->

    //function to handle like, changes item liked state to true and saves it to photoArray state and local storage for My Liked Photos page
    const handleLike = (index) => {
        let myPhoto = photoArray[index];
        myPhoto.liked = true;
        let photosCopy = [...photoArray];
        photosCopy.splice(index, 1, myPhoto);
        setPhotoArray(photosCopy);
        let likedArray = [];
        if(localStorage.hasOwnProperty('likedPhotos') === false) {
            likedArray.push(myPhoto);
            localStorage.setItem('likedPhotos', JSON.stringify(likedArray))
        } else if(localStorage.hasOwnProperty('likedPhotos') === true) {
            let localPhotoStorage = JSON.parse(localStorage.getItem('likedPhotos'));
            localPhotoStorage.push(myPhoto);
            localStorage.setItem('likedPhotos', JSON.stringify(localPhotoStorage));
        }
    }

    //function for handling unlike, changes item liked state to false and saves it to photoArray and fitlers it from local storage
    const handleUnlike = (index) => {
        let myPhoto = photoArray[index];
        myPhoto.liked = false;
        let photosCopy = [...photoArray];
        photosCopy.splice(index, 1, myPhoto);
        setPhotoArray(photosCopy);
        let localPhotoStorage = JSON.parse(localStorage.getItem('likedPhotos'));
        let unlikedPhotoStorage = localPhotoStorage.filter(storedPhoto => storedPhoto.photoData.date !== myPhoto.photoData.date)
        localStorage.setItem('likedPhotos', JSON.stringify(unlikedPhotoStorage));
    }


    return (
        <main>
            <div className="main-container">
                <section>
                    <DailyPhoto photoData={photoData} />
                </section>
                <section>
                    <PhotoForm 
                        handleFromDate={handleFromDate}
                        handleToDate={handleToDate}
                        handleSubmit={handleSubmit}
                        errorMessage={errorMessage}
                    />
                </section>
                <section className="card-section">
                    {loading
                    ? <Loader />
                    : <div></div>}
                    {
                    photoArray.map((item, index) => {
                        let itemData = item.photoData;
                        let itemLiked = item.liked
                        return(
                            <PhotoCard
                            itemData={itemData}
                            index={index}
                            itemLiked={itemLiked}
                            handleLike={handleLike}
                            handleUnlike={handleUnlike}
                            >
                            </PhotoCard>
                        )
                    })
                    }
                </section>
            </div>
        </main>
    );
}

export default Home;