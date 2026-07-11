/* ========================================================= */
/* FORMAT SINGLE TIME */
/* ========================================================= */

export function formatTime12Hour(time) {

    if (!time) {
        return "";
    }


    const [
        hourString,
        minuteString,
    ] = time.split(":");


    const hour =
        Number(hourString);

    const minute =
        Number(minuteString);


    if (
        Number.isNaN(hour) ||
        Number.isNaN(minute)
    ) {

        return time;

    }


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    const displayHour =
        hour % 12 || 12;


    const displayMinute =
        String(minute)
            .padStart(2, "0");


    return `${displayHour}:${displayMinute} ${period}`;
}



/* ========================================================= */
/* FORMAT TIME RANGE */
/* ========================================================= */

export function formatTimeRange(
    start,
    end,
) {

    if (
        !start ||
        !end
    ) {

        return "";

    }


    return `${formatTime12Hour(start)} – ${formatTime12Hour(end)}`;
}



/* ========================================================= */
/* FORMAT BOOKING DATE */
/* ========================================================= */

export function formatBookingDate(date) {

    if (!date) {
        return "";
    }


    const validDate =
        date instanceof Date
            ? date
            : new Date(date);


    if (
        Number.isNaN(
            validDate.getTime()
        )
    ) {

        return "";

    }


    return validDate.toLocaleDateString(
        "en-IN",
        {
            weekday: "short",
            day: "numeric",
            month: "short",
        }
    );
}



/* ========================================================= */
/* FORMAT LONG DATE */
/* ========================================================= */

export function formatLongBookingDate(date) {

    if (!date) {
        return "";
    }


    const validDate =
        date instanceof Date
            ? date
            : new Date(date);


    if (
        Number.isNaN(
            validDate.getTime()
        )
    ) {

        return "";

    }


    return validDate.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );
}