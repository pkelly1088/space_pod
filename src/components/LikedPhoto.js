import React, { useState, useEffect } from 'react';
import './css/myLiked.css';
import PhotoCard from './PhotoCard';
import Loader from './Loader';

const LikedPhoto = () => {
    //global state
    const [photoArray, setPhotoArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noStorage, setNoStorage] = useState();

    //checks to see there is something in local storage and save it to the photoArray state if there is
    useEffect(() => {
        getPhotosStorage();

        async function getPhotosStorage () {
            setLoading(true);
            if(localStorage.hasOwnProperty('likedPhotos')){
                let retrievedPhotos =  await JSON.parse(localStorage.getItem('likedPhotos'));
                if(retrievedPhotos.length === 0){
                    setNoStorage('You have no liked photos') 
                } else {
                    setPhotoArray(retrievedPhotos);
                    setNoStorage();
                }
            } else if(localStorage.hasOwnProperty('likedPhotos') === false) {
                setNoStorage('You have no liked photos')
            }
            setLoading(false);
        }
    }, [])

    //function for removing photo from photoArray and removes it from local storage so it isn't displayed
    const handleUnlike = (index) => {
        let myPhoto = photoArray[index];
        let photosCopy = [...photoArray];
        photosCopy.splice(index, 1);
        setPhotoArray(photosCopy);
        let localPhotoStorage = JSON.parse(localStorage.getItem('likedPhotos'));
        let unlikedPhotoStorage = localPhotoStorage.filter(storedPhoto => storedPhoto.photoData.date !== myPhoto.photoData.date)
        localStorage.setItem('likedPhotos', JSON.stringify(unlikedPhotoStorage));
    }

    return (
        <main>
            <section className='main-container'>
                <h1 className="title">My Liked Photos</h1>
                {loading 
                ? <Loader />
                : <div></div>}
                {noStorage 
                ? <div>{noStorage}</div>
                : <div></div>}
                <section className="card-section">
                    {
                        photoArray.map((item, index) => {
                            let itemData = item.photoData;
                            let itemLiked = item.liked
                            return(
                                <PhotoCard
                                itemData={itemData}
                                index={index}
                                itemLiked={itemLiked}
                                handleUnlike={handleUnlike}
                                >
                                </PhotoCard>
                            )
                        })
                    }
                </section>

            </section>
        </main>
    );
}

export default LikedPhoto;