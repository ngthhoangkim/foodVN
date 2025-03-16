import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";
import { splashStyles } from "../assets/styles";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

export default function App() {
  const router = useRouter();
  useEffect(() => {
    async function getToken() {
      const token = await messaging().getToken();
      console.log("FCM Token:", token);
    }

    getToken();
  }, []);
  // Yêu cầu quyền thông báo
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      return true;
    } else {
      console.log("Permission denied");
      return false;
    }
  };

  useEffect(() => {
    // Gọi hàm yêu cầu quyền và lấy token FCM
    requestUserPermission().then((isGranted) => {
      if (isGranted) {
        messaging()
          .getToken()
          .then((token) => {
            console.log("FCM Token:", token);
          })
          .catch((error) => console.log("Error getting FCM token:", error));
      }
    });

    // Kiểm tra khi ứng dụng mở từ trạng thái thoát (killed state)
    messaging()
      .getInitialNotification()
      .then(async (message) => {
        if (message?.data) {
          const deeplinkURL = buildDeepLinkFromNotificationData(message.data);
          if (typeof deeplinkURL === "string") {
            listener(deeplinkURL);
          }
        }
      });

    // Xử lý khi ứng dụng mở từ nền (background)
    const unsubscribeOpenedApp = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        if (remoteMessage?.data) {
          const url = buildDeepLinkFromNotificationData(remoteMessage.data);
          if (typeof url === "string") {
            listener(url);
          }
        }
      }
    );

    // Xử lý thông báo trong foreground
    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return () => {
      unsubscribeOpenedApp();
      unsubscribeOnMessage();
    };
  }, []);

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
