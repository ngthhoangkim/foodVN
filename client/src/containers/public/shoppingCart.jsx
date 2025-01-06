
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const ShoppingCart = () => {
  const items = [
    {
      name: "Burger",
      price: 20,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Fresh Lime",
      price: 10,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Pizza",
      price: 15,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Chocolate Muffin",
      price: 8,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Cheese Butter",
      price: 5,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
  ];

  const handleQuantityChange = (index, delta) => {
    items[index].quantity += delta;
    if (items[index].quantity < 1) items[index].quantity = 1;
  };

  const handleRemoveItem = (index) => {
    items.splice(index, 1);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 mt-4">Hóa đơn</h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4">Món ăn</th>
              <th className="border-b p-4">Giá</th>
              <th className="border-b p-4">Số lượng</th>
              <th className="border-b p-4">Tổng</th>
              <th className="border-b p-4">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-4 flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded mr-4"
                  />
                  {item.name}
                </td>
                <td className="p-4">${item.price.toFixed(2)}</td>
                <td className="p-4 flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    +
                  </button>
                </td>
                <td className="p-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="p-4">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-right">
          <div className="flex justify-between mb-2">
            <span>Tổng đơn:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>VAT (10%):</span>
            <span>${vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Tổng:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="mt-4 px-6 py-2 bg-[#C7253E] text-white font-bold rounded hover:bg-orange-600">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
