import React from "react";
import { CiTrash } from "react-icons/ci";

const TableCard = ({ tableNumber, peopleCount, status, onClick, onDelete }) => {
    const bgColor = status === "Trống" ? "bg-greenDark" : "bg-redDark";

    return (
        <div
            className={`relative w-40 h-48 p-3 ${bgColor} rounded-lg flex flex-col items-center justify-center text-white cursor-pointer`}
            onClick={onClick}
        >
            <div className="w-full flex items-center justify-between">
                <h1 className="text-lg text-white font-semibold">Bàn {tableNumber}</h1>
                <div
                    className="text-white hover:text-primary cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <CiTrash className="text-2xl" />
                </div>
            </div>
            {/* Ảnh bàn */}
            <img src={`${process.env.PUBLIC_URL}/assets/img/small-table.png`} alt="Table" className="w-[100px] h-[80px] object-contain mb-2 mt-6" />
            
            <h1 className="text-lg text-white font-semibold">Số lượng: {peopleCount}</h1>
        </div>
    );
};

export default TableCard;
