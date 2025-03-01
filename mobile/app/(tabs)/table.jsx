import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { TableCard } from "../../components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants/colors";

const Table = () => {
  const dispatch = useDispatch();
  const { tables, halls } = useSelector((state) => state.table);
  const [selectedHall, setSelectedHall] = useState(null);

  useEffect(() => {
    dispatch(actions.getAllTable());
    dispatch(actions.getAllHall());
  }, [dispatch]);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {selectedHall === null ? (
        // Hiển thị danh sách sảnh
        halls && halls.length > 0 ? (
          <FlatList
            data={halls}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-4 bg-primary rounded-lg mb-2 shadow-lg"
                onPress={() => setSelectedHall(item.id)}
              >
                <Text className="text-white text-lg font-semibold text-center">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text className="text-gray-600 text-lg mt-4 self-center">Không có sảnh nào</Text>
        )
      ) : (
        // Hiển thị danh sách bàn khi chọn một sảnh
        <>
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => setSelectedHall(null)} className="mr-2">
              <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text className="text-xl text-primary font-semibold">
              Danh sách bàn - {halls.find((hall) => hall.id === selectedHall)?.name}
            </Text>
          </View>

          {/* Hiển thị danh sách bàn */}
          <FlatList
            data={tables.filter((table) => table.hallID === selectedHall)}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            renderItem={({ item }) => <TableCard table={item} />}
            contentContainerStyle={{ alignItems: "center" }}
          />
        </>
      )}
    </View>
  );
};

export default Table;
