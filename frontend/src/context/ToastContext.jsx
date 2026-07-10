import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import Toast from "../components/ui/Toast";

const ToastContext = createContext(null);

const TOAST_DURATION = 3000;

export function ToastProvider({
    children,
}) {

    const [toast, setToast] =
        useState(null);

    const timerRef =
        useRef(null);

    const clearTimer =
        useCallback(() => {

            if (!timerRef.current) return;

            clearTimeout(timerRef.current);
            timerRef.current = null;

        }, []);

    const showToast =
        useCallback((message, type) => {

            clearTimer();

            setToast({ message, type });

            timerRef.current =
                setTimeout(() => {
                    setToast(null);
                    timerRef.current = null;
                }, TOAST_DURATION);

        }, [clearTimer]);

    const showSuccess =
        useCallback((message) => {
            showToast(message, "success");
        }, [showToast]);

    const showError =
        useCallback((message) => {
            showToast(message, "error");
        }, [showToast]);

    useEffect(() => {

        return () =>
            clearTimer();

    }, [clearTimer]);

    return (
        <ToastContext.Provider
            value={{
                showSuccess,
                showError,
            }}
        >
            {children}

            {
                toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                    />
                )
            }
        </ToastContext.Provider>
    );
}

export function useToast() {

    const context =
        useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast must be used within a ToastProvider"
        );
    }

    return context;
}
