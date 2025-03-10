import React from "react";
import { View, Text } from "react-native";
import { tableCardStyles } from "../assets/styles";

const TableCard = ({ table }) => {
  let bgColor = tableCardStyles.default;

  if (table.status === "Trống") {
    bgColor = tableCardStyles.empty;
  } else if (table.status === "Đầy") {
    bgColor = tableCardStyles.full;
  } else if (table.status === "Đang gọi") {
    bgColor = tableCardStyles.calling;
  }

  return (
    <View style={[tableCardStyles.container, bgColor]}>
      <Text style={tableCardStyles.text}>Bàn {table.tableNumber}</Text>
      <Text style={tableCardStyles.subText}>Số lượng: {table.maxQuantity}</Text>
    </View>
  );
};

export default TableCard;
