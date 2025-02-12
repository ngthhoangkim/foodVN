import React,{useEffect} from "react";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const Layout = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { employee } = useSelector((state) => state.employee);
  //get one employee
  useEffect(() => {
    if (id) {
      dispatch(actions.getOneEmployee(id));
    }
  }, [id, dispatch]);

  return (
    <Tabs
      screenOptions={{
        header: () => <Header name={employee.employeeName} avatar={employee.employeeImg}/>,
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      <Tabs.Screen
        name="table"
        options={{
          title: "Quản lý bàn",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="table-restaurant" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Gọi món",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="menu-book" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
