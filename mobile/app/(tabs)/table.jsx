import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { TableCard } from "../../components";

const Table = () => {
  const dispatch = useDispatch();
  const { tables } = useSelector((state) => state.table);

  useEffect(() => {
    dispatch(actions.getAllTable());
  }, [dispatch]);

  return (
    <View className="flex-1 bg-gray-100">
      {tables && tables.length > 0 ? (
        <FlatList
          data={tables.sort((a, b) => a.tableNumber - b.tableNumber)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Hiển thị mỗi hàng 2 cột
          columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 20 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => <TableCard table={item} />}
        />
      ) : (
        <Text className="text-greyDark text-lg mt-4 self-center">Không có bàn nào</Text>
      )}
    </View>
  );
};

export default Table;
