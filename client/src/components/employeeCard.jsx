import { CiTrash } from "react-icons/ci";
import React from "react";

const employeeCard = ({ name, phone, role, image, gender, onDelete, onClick }) => {
    
    const handleDeleteClick = (e) => {
        e.stopPropagation(); 
        onDelete(); 
    };
    
    return (
        <div
            className="bg-gray-100 border border-gray-200 rounded-lg shadow-md overflow-hidden relative"
            onClick={onClick}
        >
            <img
                src={image || `${process.env.PUBLIC_URL}/assets/img/employee.png`}
                alt="Employee"
                className="w-full h-auto max-h-64 object-cover"
            />
            <div className="p-4 bg-gradientPrimary text-center space-y-3">
                <h3 className="text-lg font-semibold text-txtCard">{name} - {gender}</h3>
                <p className="text-sm text-txtCard">{role}</p>
                <p className="text-sm text-txtCard">{phone}</p>
            </div>
            <button
                onClick={handleDeleteClick}
                className="absolute bottom-2 right-2 text-red p-2 hover:text-redDark transition"
            >
                <CiTrash className="w-6 h-6" />
            </button>

        </div>
    )
}

export default employeeCard