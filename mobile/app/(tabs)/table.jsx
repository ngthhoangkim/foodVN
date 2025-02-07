import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions"; // Import action logout

const Table = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actions.logout()); // Gọi action logout
  };
  return (
    <View>
       <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "red",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Table