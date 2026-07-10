export function formatLocalDate(
    date
) {
    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export function formatDisplayDate(
    dateString
) {
    return new Date(dateString)
        .toLocaleDateString(
            "en-IN",
            {
                timeZone:
                    "Asia/Kolkata",
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
}