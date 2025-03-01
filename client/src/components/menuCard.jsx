import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoAdd, IoRemove } from "react-icons/io5";

const MenuCard = ({ name, price, image, onClick, onAddToCart, onRemoveFromCart }) => {
    const [quantity, setQuantity] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    // Định dạng tiền tệ
    const formattedPrice = Number(price).toLocaleString("vi-VN") + " VND";

    // Xử lý khi nhấn vào giỏ hàng lần đầu
    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (quantity === 0) {
            setQuantity(1);
            setIsEditing(true);
            onAddToCart && onAddToCart();
        }
    };

    // Tăng số lượng
    const increaseQuantity = (e) => {
        e.stopPropagation();
        setQuantity(prev => prev + 1);
    };

    // Giảm số lượng
    const decreaseQuantity = (e) => {
        e.stopPropagation();
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        } else {
            setQuantity(0);
            setIsEditing(false);
            onRemoveFromCart && onRemoveFromCart();
        }
    };

    // Cập nhật số lượng từ input
    const handleInputChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            value = 1;
        }
        setQuantity(value);
    };

    return (
        <div
            className="w-full max-w-xs bg-gradientPrimary shadow-lg rounded-xl overflow-hidden cursor-pointer flex flex-col justify-between"
            onClick={onClick}
        >
            <img
                src={image}
                alt={name}
                className="w-full h-60 object-cover"
            />

            <div className="p-4 text-center flex flex-col justify-between min-h-[180px]">
                <div>
                    <h3 className="text-2xl font-semibold text-txtCard">{name}</h3>
                    <p className="text-xl text-txtCard">{formattedPrice}</p>
                </div>

                {/* Nút giỏ hàng / Input số lượng */}
                <div className="mt-auto flex justify-center">
                    {isEditing ? (
                        <div className="flex items-center gap-2 bg-primary shadow-md px-3 py-1 rounded-lg">
                            <button
                                className="p-1 bg-grayDark rounded-full hover:bg-gray-300 transition"
                                onClick={decreaseQuantity}
                            >
                                <IoRemove size={16} />
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleInputChange}
                                className="w-10 h-8 text-center border rounded-lg text-base font-semibold bg-white"
                                min="1"    
                            />
                            <button
                                className="p-1 bg-grayDark rounded-full hover:bg-gray-300 transition"
                                onClick={increaseQuantity}
                            >
                                <IoAdd size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
                            onClick={handleAddToCart}
                        >
                            <CiShoppingCart size={22} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
