import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";
import { splashStyles } from "../assets/styles";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={splashStyles.container}>
      <Image source={require("../assets/images/logo.png")} style={splashStyles.logo} />
    </View>
  );
}
