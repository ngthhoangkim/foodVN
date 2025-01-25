import React, { useState } from "react";
import { MdAddBox } from "react-icons/md";
import { EmployeeCard } from "../../components";

const ChefEmployee = () => {
   const [employees, setEmployees] = useState([
      { name: "Nguyễn Văn A", role: "Nhân viên bếp", phone: "0123456789" },
      { name: "Trần Thị B", role: "Nhân viên bếp", phone: "0987654321" },
      { name: "Lê Văn C", role: "Nhân viên bếp", phone: "0345678912" },
      { name: "Phạm Thị D", role: "Nhân viên bếp", phone: "0765432198" },
    ]);

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-primary font-medium">Quản lý nhân viên bếp</h1>
        <div className="ml-auto text-primary text-3xl hover:opacity-80">
          <MdAddBox />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employees.map((employee, index) => (
          <EmployeeCard key={index} name={employee.name} phone={employee.phone} role={employee.role} />
        ))}
      </div>
      {/* popup sửa */}
      {/* popup thêm */}
    </div>
  );
};

export default ChefEmployee;
