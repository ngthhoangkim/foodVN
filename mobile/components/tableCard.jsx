import React from "react";
import { View, Text } from "react-native";

const TableCard = ({ table }) => {
    let bgColor = "bg-gray-400"; // Màu mặc định

    if (table.status === "Trống") {
        bgColor = "bg-green-500";
    } else if (table.status === "Đầy") {
        bgColor = "bg-red-500";
    } else if (table.status === "Đang gọi") {
        bgColor = "bg-yellow-500";
    }

    return (
        <View className={`w-36 h-36 justify-center items-center rounded-lg shadow-lg ${bgColor} m-2`}>
            <Text className="text-white font-bold text-lg">Bàn {table.tableNumber}</Text>
            <Text className="text-white text-base">Số lượng: {table.maxQuantity}</Text>
        </View>
    );
};

export default TableCard;
