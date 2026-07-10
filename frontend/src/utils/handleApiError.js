export function handleApiError(
    error,
    showError
) {

    const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";

    showError(message);
}
