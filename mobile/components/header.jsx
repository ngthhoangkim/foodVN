import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../constants/colors";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { headerStyles } from "../assets/styles";

const Header = ({ name, avatar }) => {
    const dispatch = useDispatch();

    // Logout
    const handleLogout = () => {
        dispatch(actions.logout());
    };

    // Ảnh đại diện mặc định
    const defaultImg = require("../assets/images/logo.png");

    return (
        <View style={headerStyles.container}>
            {/* Tên nhân viên và ảnh đại diện */}
            <View style={headerStyles.userInfo}>
                <Image
                    source={avatar ? { uri: avatar } : defaultImg}
                    style={headerStyles.avatar}
                />
                <Text style={headerStyles.userName}>{name}</Text>
            </View>

            {/* Nút logout */}
            <TouchableOpacity onPress={handleLogout}>
                <MaterialIcons name="logout" size={24} color={colors.redDark} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
