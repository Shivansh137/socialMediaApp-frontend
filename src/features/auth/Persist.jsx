import { Navigate, Outlet } from "react-router-dom"
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from "react-redux";
import { selectToken } from "./authSlice";
import { useEffect, useState } from "react";
import LoadingSreen from "../../screens/LoadingScreen";
import SplashScreen from "../../screens/SplashScreen";

const Persist = () => {
    const [refresh, { isLoading, isSuccess, isError, error }] = useRefreshMutation();
    const token = useSelector(selectToken);
    const [success, setSuccess] = useState(false);
    const verifyToken = async () => {
        try {
            await refresh();
            setSuccess(true);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (!token) {
            verifyToken();
        } else {
            setSuccess(true);
        }
    }, []);
    if (isLoading) return <SplashScreen />
    if (isError && error?.data?.message === 'Unauthorized') {
        return <Navigate to={'/login'} reset />
    }
    if (success) return <Outlet />
}
export default Persist