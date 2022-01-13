import React from 'react';
import './css/home.css';
import DailyPhoto from "./DailyPhoto.js";
import PhotoForm from "./PhotoForm";

const Home = () => {
    return (
        <main>
            <div className="main-container">
                <section>
                    <h1 className="row">Space P.O.D.</h1>
                    <p className="row">Get a glimpse into NASA's photo of the day!</p>
                    <DailyPhoto />
                    <PhotoForm />
                </section>
            </div>
        </main>
    );
}

export default Home;