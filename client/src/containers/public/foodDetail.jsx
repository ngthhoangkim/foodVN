import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { addCart, deleteCart, getCart, getOneFood, updateCart } from "../../store/actions";
import { IoAdd, IoRemove } from "react-icons/io5";
import Swal from "sweetalert2";

const FoodDetail = () => {
    const { foodID } = useParams();
    const { id } = useSelector((state) => state.auth);
    const { food } = useSelector((state) => state.food);
    const cartItems = useSelector((state) => Array.isArray(state.cart?.cartItems) ? state.cart.cartItems : []);
    const dispatch = useDispatch();

    const cartItem = cartItems.find(item => item.foodID === foodID);
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);
    const [isInCart, setIsInCart] = useState(!!cartItem);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(0);

    useEffect(() => {
        dispatch(getOneFood(foodID));

        if (id) {
            dispatch(getCart(id));
        }
    }, [dispatch, foodID, id]);

    useEffect(() => {
        const updatedCartItem = cartItems.find(item => Number(item.foodID) === Number(foodID));

        if (updatedCartItem) {
            setQuantity(updatedCartItem.quantity);
            setIsInCart(true);
        } else {
            setQuantity(0);
            setIsInCart(false);
        }
    }, [cartItems, foodID]);

    if (!food) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;

    const handleAddToCart = () => {
        if (!id) {
            Swal.fire("Thông báo", "Bạn cần đăng nhập để thêm vào giỏ hàng!", "warning");
            return;
        }

        if (!isInCart) {
            const newItem = { foodID, customerID: id, quantity: 1 };
            dispatch(addCart(newItem));
        }
    };


    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        dispatch(updateCart({ foodID, customerID: id, quantity: newQuantity }));
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            dispatch(updateCart({ foodID, customerID: id, quantity: newQuantity }));
        } else {
            setIsInCart(false);
            setQuantity(0);
            dispatch(deleteCart(id, foodID));
        }
    };


    return (
        <div className="w-full mt-36 p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Ảnh món ăn */}
            <div className="w-full flex justify-center">
                <img src={food.foodImg} alt={food.name} className="rounded-lg shadow-lg" />
            </div>

            {/* Thông tin món ăn */}
            <div>
                <h1 className="text-4xl font-bold text-txtCard">{food.name}</h1>
                <p className="text-3xl text-primary mt-4 font-bold">{Number(food.price).toLocaleString("vi-VN")} VND</p>

                {/* Mô tả */}
                <div className="mt-6">
                    <h2 className="text-2xl text-txtCard font-bold">Thông tin chi tiết</h2>
                    <p className="text-xl text-txtCard mt-2 text-justify">{food.description}</p>
                </div>

                {/* Chọn số lượng (Chỉ hiển thị khi món đã trong giỏ) */}
                {isInCart && (
                    <div className="flex items-center gap-4 mt-6">
                        <button
                            className="p-1 bg-grayDark rounded-full hover:bg-primary text-txtCard transition"
                            onClick={decreaseQuantity}
                        >
                            <IoRemove size={24} />
                        </button>
                        <span className="w-10 h-8 text-center border rounded-lg text-base font-semibold bg-white flex items-center justify-center">
                            {quantity}
                        </span>
                        <button
                            className="p-1 bg-grayDark rounded-full hover:bg-primary text-txtCard transition"
                            onClick={increaseQuantity}
                        >
                            <IoAdd size={24} />
                        </button>
                    </div>
                )}
                {/* Nút thêm vào giỏ hàng */}
                {!isInCart && (
                    <motion.button
                        className="mt-6 bg-primary text-white py-3 px-6 rounded-lg shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleAddToCart}
                    >
                        Thêm món
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default FoodDetail;
