import React from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const Profile = () =>{
    const { role } = useSelector(state => state.auth);
    if (role === 'admin') return <Navigate to={'/admin'} />;
    
    return(
       <div>profile</div>
    )
}

export default Profile