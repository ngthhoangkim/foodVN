import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import * as actions from "../../store/actions";
import { colors } from "../../constants/colors";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, msg,role } = useSelector((state) => state.auth);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    dispatch(actions.login({ phone, password }));
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      if(role === 'employee' || role === 'chef' || role === 'admin'){
        router.replace("/table");
      } else{
        Alert.alert("Lỗi đăng nhập", "Tài khoản không có quyền truy cập!", [{ text: "OK" }]);
      }
    }
  }, [isLoggedIn,role]);

  // Hiển thị Alert khi có lỗi
  useEffect(() => {
    if (msg) {
      Alert.alert("Lỗi đăng nhập", msg, [{ text: "OK" }]);
    }
  }, [msg]);

  return (
    <ImageBackground
      source={require("../../assets/images/bg-login.png")}
      className="flex-1 justify-center items-center"
      resizeMode="cover"
    >
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/30" />

      <View className="w-4/5 p-5 bg-bgWhite/60 rounded-2xl">
        <Text className="text-xl text-txtCard text-center font-bold mb-5">
          Đăng nhập
        </Text>

        <TextInput
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          className="bg-white p-3 rounded-lg mb-3"
        />

        <View className="flex-row items-center bg-white rounded-lg mb-5">
          <TextInput
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            className="flex-1 p-3"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-3">
            <Feather name={showPassword ? "eye" : "eye-off"} size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          className={`bg-primary p-3 rounded-lg items-center ${loading ? "opacity-50" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold">Đăng nhập</Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
