import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import React from 'react'
import { useRouter } from "expo-router";
import { colors } from "../../constants/colors";

const Login = () => {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/images/bg-login.png")}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      resizeMode="cover"
    >
      {/* lớp phủ màu đen trong suốt 30% */}
      <View style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)"
      }} />
      <View style={{ width: "80%", padding: 20, backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: 20 }}>
        
        <Text style={{ fontSize: 20,color: colors.txtCard,textAlign: "center",fontWeight: "bold" ,marginBottom: 20 }}>Đăng nhập</Text>

        <TextInput
          placeholder="Số điện thoại"
          style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Mật khẩu"
          secureTextEntry
          style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginBottom: 20 }}
        />

        <TouchableOpacity
          onPress={() => router.replace("/table")}
          style={{ backgroundColor: colors.primary, padding: 12, borderRadius: 10, alignItems: "center" }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default Login