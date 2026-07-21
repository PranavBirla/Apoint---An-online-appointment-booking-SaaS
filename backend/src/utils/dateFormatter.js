function formatAppointmentDate(date) {

    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(date));

}

module.exports = {
    formatAppointmentDate
};