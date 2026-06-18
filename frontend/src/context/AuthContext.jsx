import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getCurrentUser,
    logoutUser,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({
    children,
}) {
    const [user, setUser] = useState(null);

    const [loading, setLoading] =
        useState(true);

    async function fetchUser() {
        try {
            const data =
                await getCurrentUser();

            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    async function logout() {
        try {
            await logoutUser();

            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}