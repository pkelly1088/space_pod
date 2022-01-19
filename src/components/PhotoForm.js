import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './css/photoForm.css';

import MomentLocalUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

const PhotoForm = ({ handleFromDate, handleToDate, handleSubmit, errorMessage }) => {

    return (
        <form className="row search-box">
            <div className="column-half search-info">
                <h2 className="section-title">NASA Daily Photo Search</h2>
                <p>Use the from and to date selectors to choose a desired range of NASA's photos of the day.</p>
                <p>Images with info with be displayed below.</p>
                <p>Hit the Like button for photos you like and they will be saved on the My Liked Photos page.</p>
            </div>
            <div className="column-half search-input">
                <div >
                    <label htmlFor="from day picker input" className="input-title">From</label>
                    <DayPickerInput id="from day picker input"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    placeholder={`${formatDate(new Date())}`}
                    onDayChange={handleFromDate}
                    />
                </div>
                <div>
                    <label htmlFor='to day picker input' className="input-title">To</label>
                    <DayPickerInput id="to day picker input"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    placeholder={`${formatDate(new Date())}`}
                    onDayChange={handleToDate}
                    />
                </div>
                <div className="error-container">
                    <p className="error-message">{errorMessage}</p>
                </div>
                <div className="submit-btn">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </form>
    )
}

export default PhotoForm;