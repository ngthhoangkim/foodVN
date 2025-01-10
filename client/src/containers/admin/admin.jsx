import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { path } from "../../ultils/constant";

const Admin = () =>{
    const { isLoggedIn,role } = useSelector(state => state.auth);
    
    if(!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    if (role !== 'admin') return <Navigate to={'/'} />;

    return(
        <p>Admin nè</p>
    )
}

export default Admin