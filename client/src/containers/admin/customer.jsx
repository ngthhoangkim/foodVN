import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../components";
import * as action from "../../store/actions";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const Customer = () => {
    const { customers } = useSelector((state) => state.customer);
    const { order } = useSelector((state) => state.order);
    const { bestseller } = useSelector((state) => state.food || [])

    const [searchTerm, setSearchTerm] = useState("");
    const [orderCount, setOrderCount] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const dispatch = useDispatch();

    //call api get all
    useEffect(() => {
        dispatch(action.getAllCustomer());
        dispatch(action.getAllOrder());
        dispatch(action.getBestseller());
    }, [dispatch]);

    useEffect(() => {
        if (customers.length > 0 && order.length > 0) {
            const countMap = {};
            order.forEach(order => {
                const customerID = order.customer?.id;
                if (customerID) {
                    countMap[customerID] = (countMap[customerID] || 0) + 1;
                }
            });
            setOrderCount(countMap);
        }
    }, [customers, order]);

    const sortedCustomers = [...customers].sort((a, b) => {
        return (orderCount[b.id] || 0) - (orderCount[a.id] || 0);
    });

    const filteredCustomers = sortedCustomers.filter((customer) =>
        customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customerPhone.includes(searchTerm)
    );
    //phân trang
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Phân trang bestseller
    const [currentBestsellerPage, setCurrentBestsellerPage] = useState(1);
    const bestsellerItemsPerPage = 5;

    const sortedBestseller = [...bestseller].sort((a, b) => b.orderCount - a.orderCount);
    const totalBestsellerPages = Math.ceil(sortedBestseller.length / bestsellerItemsPerPage);
    const paginatedBestseller = sortedBestseller.slice(
        (currentBestsellerPage - 1) * bestsellerItemsPerPage,
        currentBestsellerPage * bestsellerItemsPerPage
    );

    const handleBestsellerPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalBestsellerPages) {
            setCurrentBestsellerPage(newPage);
        }
    };

    return (
        <div className="w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl text-primary font-medium">Thông tin khách hàng</h1>
                <div className="ml-auto">
                    <Search
                        placeholder="Tìm theo tên hoặc số điện thoại..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
                        }}
                    />
                </div>
            </div>
            <table className="table-auto w-full bg-white shadow-md rounded">
                <thead>
                    <tr className="bg-primary text-white">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Tên</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Số điện thoại</th>
                        <th className="px-4 py-2">Số lần đến nhà hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCustomers.length > 0 ? (
                        paginatedCustomers.map((customer) => (
                            <tr key={customer.id} className="text-center border-b">
                                <td className="px-4 py-2">{customer.id}</td>
                                <td className="px-4 py-2">{customer.customerName}</td>
                                <td className="px-4 py-2">{customer.customerEmail}</td>
                                <td className="px-4 py-2">{customer.customerPhone}</td>
                                <td className="px-4 py-2">{orderCount[customer.id] || 0}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">
                                Không có dữ liệu khách hàng.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex justify-center items-center mt-4">
                <button
                    className={`px-3 py-1 rounded-full mx-1 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-primary text-white"}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <GrFormPreviousLink size={24} />
                </button>
                <span className="mx-2 text-primary">Trang {currentPage} / {totalPages}</span>
                <button
                    className={`px-3 py-1 mx-1 rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-primary text-white"}`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <GrFormNextLink size={24} />
                </button>
            </div>
            <div className="mt-5">
                <h1 className="text-2xl text-primary font-medium">Danh sách món ăn bán chạy của nhà hàng</h1>
                <table className="table-auto w-full bg-white shadow-md rounded mt-4">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="px-4 py-2" colSpan={4}>Tên món ăn</th>
                            <th className="px-4 py-2" colSpan={2}>Ảnh</th>
                            <th className="px-4 py-2" colSpan={2}>Số lần gọi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedBestseller.length > 0 ? (
                            paginatedBestseller.map((food) => (
                                <tr key={food.id} className="text-center border-b">
                                    <td className="px-4 py-2" colSpan={4}>{food.food.name}</td>
                                    <td className="px-4 py-2" colSpan={2}>
                                        <img src={food.food.foodImg} alt={food.food.name} className="w-20 h-20 object-cover rounded mx-auto" /> {/* Giới hạn kích thước ảnh */}
                                    </td>
                                    <td className="px-4 py-2" colSpan={2}>{food.orderCount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-gray-500">
                                    Không có dữ liệu món ăn.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Phân trang bestseller */}
                <div className="flex justify-center items-center mt-4">
                    <button
                        className={`px-3 py-1 rounded-full mx-1 ${currentBestsellerPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-primary text-white"}`}
                        disabled={currentBestsellerPage === 1}
                        onClick={() => handleBestsellerPageChange(currentBestsellerPage - 1)}
                    >
                        <GrFormPreviousLink size={24} />
                    </button>
                    <span className="mx-2 text-primary">Trang {currentBestsellerPage} / {totalBestsellerPages}</span>
                    <button
                        className={`px-3 py-1 mx-1 rounded-full ${currentBestsellerPage === totalBestsellerPages ? "opacity-50 cursor-not-allowed" : "bg-primary text-white"}`}
                        disabled={currentBestsellerPage === totalBestsellerPages}
                        onClick={() => handleBestsellerPageChange(currentBestsellerPage + 1)}
                    >
                        <GrFormNextLink size={24} />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Customer
