function parseLocalDate(dateString) {

    const [year, month, day] =
        dateString
            .split("-")
            .map(Number);

    return new Date(
        year,
        month - 1,
        day
    );
}

module.exports = {
    parseLocalDate
};