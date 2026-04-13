import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoutes({ children }) {
    const { user,loading } = useSelector((state) => state.auth);
    if(loading){
        return null;
    }
    if(!user){
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoutes