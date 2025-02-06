import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../../constants/colors';

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,  // Màu khi tab được chọn
          tabBarInactiveTintColor: colors.greyDark, // Màu khi tab không được chọn
        }}
      >
        <Tabs.Screen
          name='table'
          options={{
            title: 'Quản lý bàn',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="table-restaurant"
                size={24}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen
          name='order'
          options={{
            title: 'Quản lý gọi món',
            headerShown: false,
            tabBarIcon: ({color}) => (
              <MaterialIcons
                name="menu-book"
                size={24}
                color={color}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout