import React, { useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../store/actions";
import { motion } from "framer-motion";

const Order = () => {
  const { order } = useSelector((state) => state.order);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getOrder(id));
    }
  }, [id, dispatch]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-32 p-4">
      <h1 className="text-3xl text-primary font-bold text-center mb-6">
        Gọi món
      </h1>

      <Tabs.Root defaultValue="followFood">
        <Tabs.List className="flex border-b bg-gray-100 rounded-md overflow-hidden">
          <Tabs.Trigger
            value="followFood"
            className="flex-1 px-4 py-3 text-base font-medium text-center bg-white hover:bg-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:rounded-t-md"
          >
            Theo dõi món ăn
          </Tabs.Trigger>
          <Tabs.Trigger
            value="bill"
            className="flex-1 px-4 py-3 text-base font-medium text-center bg-white hover:bg-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:rounded-t-md"
          >
            Hóa đơn
          </Tabs.Trigger>
          <Tabs.Trigger
            value="foodHistory"
            className="flex-1 px-4 py-3 text-base font-medium text-center bg-white hover:bg-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:rounded-t-md"
          >
            Xem lịch sử hóa đơn
          </Tabs.Trigger>
        </Tabs.List>

        {/* Tab Theo dõi món ăn */}
        <Tabs.Content value="followFood" className="p-4 bg-white rounded-b-md shadow">
          {order && (order.status === "pending" || order.status === "preparing") ? (
            order.orderDetails?.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-primary">
                    <th className="border-b p-4">Món ăn</th>
                    <th className="border-b p-4 text-center">Số lượng</th>
                    <th className="border-b p-4 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderDetails.map((item) => (
                    <tr key={item.food.id} className="hover:bg-gray-100">
                      <td className="p-4 flex items-center">
                        <img src={item.food.foodImg} alt={item.food.name} className="w-12 h-12 rounded mr-4" />
                        {item.food.name}
                      </td>
                      <td className="p-4 text-center">{item.quantity}</td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 text-base border-2 rounded-lg ${item.status === "pending"
                              ? "text-primary border-primary"
                              : item.status === "complete"
                                ? "text-greenDark border-greenDark"
                                : "text-greenDark border-greenDark" 
                            }`}
                        >
                          {item.status === "pending"
                            ? "Món đang được chế biến"
                            : item.status === "complete"
                              ? "Món đã chế biến xong"
                              : "Món đã được phục vụ"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">Bạn chưa gọi món nào.</p>
            )
          ) : (
            <p className="text-center text-gray-500">Không có đơn hàng đang chờ xử lý.</p>
          )}
        </Tabs.Content>

        {/* Tab Hóa đơn */}
        <Tabs.Content value="bill" className="p-4 bg-white rounded-b-md shadow">
          {order && order.orderDetails?.length > 0 ? (
            <div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-primary">
                    <th className="border-b p-4">Món ăn</th>
                    <th className="border-b p-4 text-center">Số lượng</th>
                    <th className="border-b p-4 text-center">Giá (VND)</th>
                    <th className="border-b p-4 text-center">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderDetails.map((item) => (
                    <tr key={item.food.id} className="hover:bg-gray-100">
                      <td className="p-4 flex items-center">
                        <img src={item.food.foodImg} alt={item.food.name} className="w-12 h-12 rounded mr-4" />
                        {item.food.name}
                      </td>
                      <td className="p-4 text-center">{item.quantity}</td>
                      <td className="p-4 text-center">
                        {item.food.price ? Number(item.food.price).toLocaleString("vi-VN") : "0"}
                      </td>
                      <td className="p-4 text-center">
                        {item.totalPrice ? Number(item.totalPrice).toLocaleString("vi-VN") : "0"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Hiển thị tổng tiền */}
              <div className="text-right mt-4 text-xl font-bold text-primary">
                Tổng tiền: {order.total ? Number(order.total).toLocaleString("vi-VN") : "0"} VND
              </div>

              {/*Thanh toán */}
              <div className="text-right mt-4">
                <motion.button
                  className="relative overflow-hidden border-2 border-primary text-primary rounded-lg font-semibold text-lg transition-all duration-300 group mt-4 px-6 py-2"
                >
                  <span className="relative z-10 group-hover:text-txtCard">Thanh toán</span>
                  <span className="absolute inset-0 bg-gradientPrimary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </motion.button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Chưa có hóa đơn nào.</p>
          )}
        </Tabs.Content>


        {/* Tab Lịch sử hóa đơn */}
        <Tabs.Content value="history" className="p-4 bg-white rounded-b-md shadow">
          <p>🍽️ Lịch sử món ăn đã thử...</p>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default Order;
