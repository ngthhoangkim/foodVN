import { DashboardCart } from "../../components";
import React from "react";

const AdminHome = () => {
    const cardsData = [
        {
            icon: '💰',
            title: 'Doanh thu',
            value: '2,409',
            bgColor: 'bg-primary',
        },
        {
            icon: '👥',
            title: 'Khách hàng',
            value: '10,000',
            bgColor: 'bg-green-100',
        },
        {
            icon: '👨‍🍳',
            title: 'Đầu bếp',
            value: '10',
            bgColor: 'bg-pink-100',
        },
        {
            icon: '🧑‍💼',
            title: 'Nhân viên',
            value: '500',
            bgColor: 'bg-red-100',
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
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminHome;
