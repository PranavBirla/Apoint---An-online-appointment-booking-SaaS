export function formatTime12Hour(time) {
    if (!time) return "";

    const [hoursString, minutes] = time.split(":");

    const hours = Number(hoursString);

    const period = hours >= 12 ? "PM" : "AM";

    const displayHour = hours % 12 || 12;

    return `${displayHour}:${minutes} ${period}`;
}


export function formatTimeRange(start, end) {
    if (!start || !end) return "";

    return `${formatTime12Hour(start)} – ${formatTime12Hour(end)}`;
}


export function formatBookingDate(date) {
    if (!date) return "";

    return date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });
}


export function formatLongBookingDate(date) {
    if (!date) return "";

    return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
}