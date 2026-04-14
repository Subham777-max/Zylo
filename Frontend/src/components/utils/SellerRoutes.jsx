import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function SellerRoutes({children}) {
    const { user } = useSelector((state)=> state.auth)
    if(user?.role === "seller"){
        return children
    }
    return <Navigate to="/" replace />
}

export default SellerRoutes