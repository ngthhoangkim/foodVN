import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../constants/colors";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const Header = ({ name, avatar }) => {
    const dispatch = useDispatch();
    //logout
    const handleLogout = () => {
        dispatch(actions.logout());
    };
    //avatar mặc định
    const defaultImg = require("../assets/images/logo.png")
    return (
        <View className="h-16 bg-white flex-row items-center justify-between px-4 shadow-md">
            {/* Tên nhân viên và ảnh đại diện */}
            <View className="flex-row items-center">
                <Image
                    source={avatar ? { uri: avatar } : defaultImg}
                    className="w-10 h-10 rounded-full mr-3"
                />

                <Text className="text-xl font-bold text-text">{name}</Text>
            </View>
            {/* Nút logout */}
            <TouchableOpacity onPress={handleLogout}>
                <MaterialIcons name="logout" size={24} color={colors.redDark} />
            </TouchableOpacity>
        </View>
    )
}

export default Header