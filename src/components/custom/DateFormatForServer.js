import React from 'react'

const DateFormatForServer = (dateString) => {
    const inputDate = new Date(dateString);

    // Target format: "2024-01-01 12:00:00"
    const targetDate = new Date(inputDate);

    // Convert input date to target format
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1; // Months are 0-indexed
    const day = targetDate.getDate();
    const hours = targetDate.getHours();
    const minutes = targetDate.getMinutes();
    const seconds = targetDate.getSeconds();

    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return formattedDate; // Returns "2024-01-01 12:00:00" or "2024-01-01T12:00:00" depending on the target format. Example: "2024-01-01 12:00:00" or "2024-01-01T12:
}

const DateFormatForUser = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return inputDate.toLocaleDateString('en-GB', options);
}

export default DateFormatForServer
export { DateFormatForUser }
