import React from "react";
import { FiUser } from "react-icons/fi";
import { CiTrash } from "react-icons/ci";

const TableCard = ({ tableNumber, peopleCount, status, onClick, onDelete }) => {
    const bgColor = status === "empty" ? "bg-greenDark" : "bg-redDark";
    const iconColor = status === "empty" ? "text-white" : "text-yellowDark";

    const peopleIcons = Array.from({ length: peopleCount }, (_, index) => (
        <FiUser key={index} className={`${iconColor} text-xl`} />
    ));

    return (
        <div
            className={`relative w-40 p-3 ${bgColor} rounded-lg flex flex-col items-center justify-center text-white shadow-lg cursor-pointer`}
            onClick={onClick}
        >
            {/* Icon xóa ở góc phải trên */}
            <div
                className="absolute top-2 right-2 text-white hover:text-redDark cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation(); 
                    onDelete(tableNumber); 
                }}
            >
                <CiTrash className="text-xl" />
            </div>

            <h1 className="text-lg font-semibold">Bàn {tableNumber}</h1>
            <div className="grid grid-cols-4 gap-2 mt-2 w-full">
                {peopleIcons}
            </div>
        </div>
    );
};

export default TableCard;
