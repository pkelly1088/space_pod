import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

import MomentLocalUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

const PhotoForm = ({ handleFromDate, handleToDate, handleSubmit }) => {

    return (
        <form>
            <p>From</p>
            <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder={`${formatDate(new Date())}`}
            onDayChange={handleFromDate}
            />
            <p>To</p>
            <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder={`${formatDate(new Date())}`}
            onDayChange={handleToDate}
            />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default PhotoForm;