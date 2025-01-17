import React, { useState, useEffect } from "react";
import { MdAddBox } from "react-icons/md";
import { Popup, TableCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { createTable, deleteTable, getAllTable, updateTable } from "../../store/actions";
import Swal from 'sweetalert2'

const Table = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    const dispatch = useDispatch();
    const { tables } = useSelector((state) => state.table);

    // Get all tables from the API
    useEffect(() => {
        dispatch(getAllTable());
    }, [dispatch]);

    // Open popup to edit table
    const openPopup = (table) => {
        setSelectedTable({
            id: table.id,
            tableNumber: table.tableNumber,
            peopleCount: table.maxQuantity,
        });
        setIsPopupVisible(true);
    };

    // Close popup
    const closePopup = () => {
        setIsPopupVisible(false);
        setSelectedTable(null);
    };

    // Popup for adding a new table
    const openAddPopup = () => {
        setIsAddPopupVisible(true);
    };

    const closeAddPopup = () => {
        setIsAddPopupVisible(false);
    };

    // Edit table
    const handleUpdateTable = (updatedTableNumber, updatedPeopleCount) => {
        const updatedTable = {
            id: selectedTable.id,
            tableNumber: updatedTableNumber,
            maxQuantity: updatedPeopleCount,
        };
        console.log("Updated Table Payload:", updatedTable);
        dispatch(updateTable(updatedTable.id, updatedTable))
            .then(() => {
                Swal.fire("Thành công!", "Cập nhật bàn thành công", "success");
            })
            .catch((error) => {
                Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình sửa", "error");
            });
        closePopup();
    };

    // Delete table
    const handleDeleteTable = (tableNumber) => {
        Swal.fire({
            title: "Xác nhận",
            text: `Bạn có chắc muốn xóa bàn ${tableNumber} không?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTable(tableNumber))
                    .then(() => {
                        Swal.fire("Thành công!", "Đã xóa bàn thành công.", "success");
                    })
                    .catch((error) => {
                        Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình xóa", "error");
                    });
            }
        });
    };

    // Add new table
    const addTable = (numberTable, peopleCount) => {
        const payload = {
            tableNumber: numberTable,
            maxQuantity: peopleCount,
            status: "Trống",
        };
        dispatch(createTable(payload))
            .then(() => {
                Swal.fire("Thành công!", "Thêm bàn thành công", "success");
            })
            .catch((error) => {
                Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình thêm", "error");
            });
        closeAddPopup();
    };

    return (
        <div className="w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl text-primary font-medium">Quản lý bàn</h1>
                <div className="ml-auto text-primary text-3xl hover:opacity-80" onClick={openAddPopup}>
                    <MdAddBox />
                </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
                {tables && tables.length > 0 ? (
                    tables.map((table) => (
                        <TableCard
                            key={table.id}
                            tableNumber={`${table.tableNumber}`}
                            peopleCount={table.maxQuantity}
                            status={table.status === "Trống" ? "empty" : "full"}
                            onClick={() => openPopup(table)}
                            onDelete={handleDeleteTable}
                        />
                    ))
                ) : (
                    <div className="col-span-6 text-center text-gray-500">
                        Không có bàn nào.
                    </div>
                )}
            </div>
            {/* popup sửa */}
            {isPopupVisible && selectedTable && (
                <Popup
                    isAdd={false}
                    numberTable={selectedTable.tableNumber}
                    peopleCount={selectedTable.peopleCount}
                    onClose={closePopup}
                    onEdit={handleUpdateTable}
                />
            )}
            {/* popup thêm */}
            {isAddPopupVisible && (
                <Popup
                    isAdd={true}
                    onClose={closeAddPopup}
                    onSubmit={addTable}
                />
            )}
        </div>
    );
};

export default Table;
