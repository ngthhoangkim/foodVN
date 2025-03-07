import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoAdd, IoRemove } from "react-icons/io5";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart, updateCart } from "../../store/actions";
import Swal from "sweetalert2";

const ShoppingCart = () => {

  const { cartItems } = useSelector((state) => state.cart || []);
  const { role, id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //get all
  useEffect(() => {
    if (id) {
      dispatch(getCart(id));
    }
  }, [id, dispatch]);

  const handleQuantityChange = (foodID, delta) => {
  
    const item = cartItems.find((item) => item.foodID === foodID);

    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      const payload = {
        customerID: id,
        foodID,
        quantity: newQuantity,
      };
      dispatch(updateCart(payload));
    }
  };


  const handleRemoveItem = (foodID) => {
    if (!id) return;

    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Món ăn này sẽ bị xóa khỏi giỏ hàng!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCart(id, foodID));
        Swal.fire("Đã xóa!", "Món ăn đã bị xóa khỏi giỏ hàng.", "success");
      }
    });
  };

  const subtotal = Array.isArray(cartItems) ?
    cartItems.reduce((sum, item) => sum + (Number(item.food?.price) || 0) * (item.quantity || 0), 0)
    : 0;

  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl text-primary font-bold text-center mb-4 mt-4">Hóa đơn</h1>
        {cartItems.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-primary">
                <th className="border-b p-4">Món ăn</th>
                <th className="border-b p-4">Giá (VND)</th>
                <th className="border-b p-4">Số lượng</th>
                <th className="border-b p-4">Tổng (VND)</th>
                <th className="border-b p-4">Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="p-4 flex items-center">
                    <img src={item.food.foodImg} alt={item.food.name} className="w-12 h-12 rounded mr-4" />
                    {item.food.name}
                  </td>
                  <td className="p-4">{item.food.price ? Number(item.food.price).toLocaleString("vi-VN") : "0"}</td>
                  <td className="p-4 flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.foodID, -1)}
                      className="p-2 bg-gray-200 hover:bg-primary rounded-full hover:text-white"
                    >
                      <IoRemove />
                    </button>
                    <span className="mx-3">{item.quantity || 0}</span>
                    <button
                      onClick={() => handleQuantityChange(item.foodID, 1)}
                      className="p-2 bg-gray-200 hover:bg-primary rounded-full hover:text-white"
                    >
                      <IoAdd />
                    </button>
                  </td>

                  <td className="p-4">{item.food.price && item.quantity ? (Number(item.food.price) * item.quantity).toLocaleString("vi-VN") : "0"}</td>
                  <td className="p-4">
                    <button
                      className="text-txtCard hover:text-primary"
                      onClick={() => handleRemoveItem(item.foodID)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-lg text-gray-600">Giỏ hàng của bạn đang trống.</p>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 text-right text-xl font-bold text-txtCard">
            <div className="flex justify-between mb-2">
              <span>Tổng đơn:</span>
              <span className="mr-8">{subtotal.toLocaleString("vi-VN")} VND</span>
            </div>
            <motion.button
              className="relative overflow-hidden border-2 border-primary text-primary rounded-lg font-semibold text-lg transition-all duration-300 group mt-4 px-6 py-2"
            >
              <span className="relative z-10 group-hover:text-txtCard">Gọi món ngay</span>
              <span className="absolute inset-0 bg-gradientPrimary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;