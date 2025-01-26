import React from "react";
import { IoMdClose } from "react-icons/io";

const PopupEmployee = ({ isAdd, employeeData, role, onClose, onSubmit, onChange }) => {

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm relative w-96">
                <h2 className="text-xl font-medium mb-4">
                    {isAdd ? `Thêm nhân viên ${role}` : `Chỉnh sửa nhân viên ${role}`}
                </h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-primary hover:opacity-60 focus:outline-none"
                >
                    <IoMdClose className="text-2xl text-primary" />
                </button>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(employeeData);
                    }}
                    className="text-left"
                >
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            value={employeeData.name || ""}
                            onChange={(e) => onChange(e)}
                            placeholder="Tên nhân viên"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="phone"
                            value={employeeData.phone || ""}
                            onChange={(e) => onChange(e)}
                            placeholder="Số điện thoại"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            name="gender"
                            value={employeeData.gender || ""}
                            onChange={(e) => onChange(e)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="upload-photo"
                            className="cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg"
                        >
                            📁 Ảnh nhân viên
                        </label>
                        <input
                            id="upload-photo"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => onChange(e)}
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

export default PopupEmployee;
