import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login"); 
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require("../assets/images/logo.png")} 
        style={{ width: 200, height: 200, resizeMode: "contain" }}
      />
    </View>
  );
}
