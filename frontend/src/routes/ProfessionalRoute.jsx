import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLoader from "../components/common/PageLoader";

export default function ProfessionalRoute({
    children,
}) {
    const {
        user,
        loading,
    } = useAuth();

    if (loading) {
        return (
            <PageLoader />
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (
        user.role !==
        "professional"
    ) {
        return (
            <Navigate
                to="/professionals"
                replace
            />
        );
    }

    return children;
}