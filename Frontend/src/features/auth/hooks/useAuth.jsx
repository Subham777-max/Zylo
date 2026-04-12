import { setError,setLoading,setUser } from "../state/auth.slice";
import { register, login } from "../services/auth.service";

export const useAuth = () => {
    async function handleRegister({ email, contact, password, fullName, isSeller = false }){
        setLoading(true);
        setError(null);
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
        setLoading(true);
        setError(null);
        try {
            const response = await login({ email, password });
            setUser(response.user);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        handleRegister,
        handleLogin
    }
}