import React, { useEffect } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { Search } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions";

const Customer = () => {
    const { customers } = useSelector((state) => state.customer);
    const dispatch = useDispatch();

    //call api get all
    useEffect(() => {
        dispatch(action.getAllCustomer());
    }, [dispatch]);

    return (
        <div className="w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl text-primary font-medium">Thông tin khách hàng</h1>
                <div className="ml-auto">
                    <Search placeholder="Tìm kiếm..." />
                </div>
            </div>
            <table className="table-auto w-full bg-white shadow-md rounded">
                <thead>
                    <tr className="bg-primary text-white">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Username</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Số điện thoại</th>
                        {/* <th className="px-4 py-2">Trạng thái</th> */}
                        <th className="px-4 py-2">Ngày tạo</th>
                        <th className="px-4 py-2">Ngày cập nhật</th>
                        <th className="px-4 py-2">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {customers && customers.length > 0 ? (
                        customers.map((customer) => (
                            <tr key={customer.id} className="text-center border-b">
                                <td className="px-4 py-2">{customer.id}</td>
                                <td className="px-4 py-2">{customer.customerName}</td>
                                <td className="px-4 py-2">{customer.customerEmail}</td>
                                <td className="px-4 py-2">{customer.customerPhone}</td>
                                {/* <td className="px-4 py-2">
                                    <span
                                        className={`px-3 py-1 rounded text-white ${customer.status === "Active" ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    >
                                        {customer.status}
                                    </span>
                                </td> */}
                                <td className="px-4 py-2">{customer.createdAt}</td>
                                <td className="px-4 py-2">{customer.updatedAt}</td>
                                <td className="px-4 py-2">
                                    <button className="text-primary hover:opacity-60 text-2xl">
                                        <MdOutlineDelete />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-gray-500">
                                Không có dữ liệu khách hàng.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Customer
