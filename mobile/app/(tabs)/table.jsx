import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions"; // Import action logout

const tables = [
  { id: "1", name: "Bàn 1", quantity: 4, color: "#C62828" }, 
  { id: "2", name: "Bàn 2", quantity: 4, color: "#AD1457" }, 
  { id: "3", name: "Bàn 3", quantity: 4, color: "#00897B" }, 
  { id: "4", name: "Bàn 4", quantity: 4, color: "#F9A825" },
  { id: "5", name: "Bàn 5", quantity: 4, color: "#AD1457" },
  { id: "6", name: "Bàn 6", quantity: 4, color: "#C62828" }, 
  { id: "7", name: "Bàn 7", quantity: 4, color: "#00897B" }, 
  { id: "8", name: "Bàn 8", quantity: 4, color: "#F9A825" },
];

const Table = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actions.logout()); // Gọi action logout
  };
  return (
    <View style={styles.container}>
      {/* Nút đăng xuất */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>

      {/* Giao diện bàn ăn dạng grid */}
      <View style={styles.grid}>
        {tables.map((item) => (
          <View key={item.id} style={[styles.item, { backgroundColor: item.color }]}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.quantityText}>Số lượng: {item.quantity}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20, 
    backgroundColor: "#F5F5F5",
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20, 
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: 350,
    gap: 15,
  },
  item: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15, 
    marginHorizontal: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  quantityText: {
    fontSize: 16,
    color: "white",
  },
});

