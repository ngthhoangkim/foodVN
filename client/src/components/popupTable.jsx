import React from "react";
import { IoMdClose } from "react-icons/io";

const PopupTable = ({ isAdd, numberTable, peopleCount, onClose, onEdit, onSubmit }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm relative">
                <h2 className="text-xl font-medium mb-4">
                    {isAdd ? "Thêm Bàn Mới" : `Chỉnh Sửa Bàn ${numberTable}`}
                </h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-primary hover:opacity-60 focus:outline-none"
                >
                    <IoMdClose className="text-2xl text-primary" />
                </button>

                {/* Form chỉnh sửa hoặc thêm bàn */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const updatedTableNumber = e.target.numberTable.value;
                        const updatedPeopleCount = e.target.peopleCount.value;
                        if (isAdd) {
                            onSubmit(updatedTableNumber, updatedPeopleCount);
                        } else {
                            onEdit(updatedTableNumber, updatedPeopleCount);
                        }
                    }}
                    className="text-left"
                >
                    <div className="mb-4">
                        <input
                            name="numberTable"
                            type="number"
                            placeholder="Nhập số bàn"
                            defaultValue={isAdd ? "" : numberTable}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            name="peopleCount"
                            type="number"
                            placeholder="Nhập số người"
                            defaultValue={isAdd ? "" : peopleCount}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 focus:outline-none"
                    >
                        {isAdd ? "Thêm" : "Lưu thay đổi"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupTable;
