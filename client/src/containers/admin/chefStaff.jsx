import React, { useState } from "react";
import Sidebar from "./sidebar";

const ChefStaff = ({ name, role, phone, onUpdate }) => {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        src="https://via.placeholder.com/150"
        alt="Employee"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 bg-yellow-200">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{role}</p>
        <p className="text-sm text-gray-600">{phone}</p>
        <button
          onClick={() => onUpdate({ name, role, phone })}
          className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

const UpdatePopup = ({ onClose, onSave, employee }) => {
  const [name, setName] = useState(employee ? employee.name : "");
  const [phone, setPhone] = useState(employee ? employee.phone : "");
  const [role, setRole] = useState(employee ? employee.role : "");
  const [image, setImage] = useState(null);

  const handleSave = () => {
    onSave({ name, phone, role, image });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          {employee ? "Chỉnh sửa thông tin nhân viên" : "Thêm nhân viên bếp"}
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-yellow-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-yellow-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Chức vụ"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-yellow-300"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="flex items-center justify-between w-full px-4 py-2 border rounded cursor-pointer hover:bg-gray-100"
          >
            Ảnh
            <span className="text-yellow-500">📂</span>
          </label>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            {employee ? "Lưu" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ChefEmployee = () => {
  const [employees, setEmployees] = useState([
    { name: "Tên nhân viên", role: "Bếp trưởng", phone: "Số điện thoại" },
    { name: "Tên nhân viên", role: "Bếp phó", phone: "Số điện thoại" },
    { name: "Tên nhân viên", role: "Nhân viên bếp", phone: "Số điện thoại" },
    { name: "Tên nhân viên", role: "Nhân viên bếp", phone: "Số điện thoại" },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleAdd = () => {
    setCurrentEmployee(null);
    setShowPopup(true);
  };
  const handleUpdate = (employee) => {
    setCurrentEmployee(employee);
    setShowPopup(true);
  };

  const handleSave = (newData) => {
    if (currentEmployee) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.name === currentEmployee.name ? newData : employee
        )
      );
    } else {
      setEmployees((prevEmployees) => [...prevEmployees, newData]);
    }
    console.log("Lưu thông tin nhân viên:", newData);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Nhân viên bếp</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            +
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {employees.map((employee, index) => (
            <ChefStaff
              key={index}
              name={employee.name}
              role={employee.role}
              phone={employee.phone}
              onUpdate={handleUpdate}
            />
          ))}
        </div>

        {showPopup && (
          <UpdatePopup
            onClose={() => setShowPopup(false)}
            onSave={handleSave}
            employee={currentEmployee}
          />
        )}
      </main>
    </div>
  );
};

export default ChefEmployee;
