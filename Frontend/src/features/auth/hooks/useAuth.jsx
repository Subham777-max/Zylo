import { setError,setLoading,setUser } from "../state/auth.slice";
import { register, login } from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { loading, user, error } = useSelector((state) => state.auth);
    async function handleRegister({ email, contact, password, fullName, isSeller = false }){
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await register({ email, contact, password, fullName, isSeller });
            setUser(response.user);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin({ email, password }){
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await login({ email, password });
            dispatch(setUser(response.user));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        handleRegister,
        handleLogin,
        user,
        loading,
        error
    }
}