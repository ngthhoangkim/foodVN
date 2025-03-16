import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer, getAllEmployee } from "../../store/actions";
import { DashboardCart } from "../../components";
import { path } from "../../ultils/constant";


const AdminHome = () => {
    const dispatch = useDispatch();
    const { count  } = useSelector((state) => state.customer);
    const countOrderStaff = useSelector(state => state.employee.countOrderStaff);
    const countChefStaff = useSelector(state => state.employee.countChefStaff);
  

    //call api
    useEffect(() => {
        dispatch(getAllCustomer());
        dispatch(getAllEmployee())
    }, [dispatch]);

    const cardsData = [
        {
            icon: '💰',
            title: 'Doanh thu',
            value: '2,409',
            bgColor: 'bg-primary',
            path: path.ADMIN_ORDER
        },
        {
            icon: '👥',
            title: 'Khách hàng',
            value: count,
            bgColor: 'bg-green-100',
            path:path.ADMIN_CUSTOMER,
        },
        {
            icon: '👨‍🍳',
            title: 'Đầu bếp',
            value: countChefStaff,
            bgColor: 'bg-pink-100',
            path:path.ADMIN_CHEF,
        },
        {
            icon: '🧑‍💼',
            title: 'Nhân viên',
            value: countOrderStaff,
            bgColor: 'bg-red-100',
            path: path.ADMIN_EMPLOYEE,
        },
    ];
    return (
        <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cardsData.map((card, index) => (
                    <DashboardCart
                        key={index}
                        icon={<span className="text-xl">{card.icon}</span>}
                        title={card.title}
                        value={card.value}
                        bgColor={card.bgColor}
                        path={card.path}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminHome;
