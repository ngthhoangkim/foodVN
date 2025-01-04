import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useEffect } from "react";
import Button from "../../components/button";
import { useLocation, Link } from "react-router-dom";
import { apiRegister } from "../../services/auth";

const Login = () => {
    const location = useLocation();

    const [isRegister, setIsRegister] = useState(location.state?.flag);
    const [showPassword, setShowPassword] = useState(false);
    const [payload, setPayload] = useState({});
    const [birthDate, setBirthDate] = useState(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        setIsRegister(location.state?.flag);
    }, [location.state?.flag]);

    const handleSumit = async () => {
        const response = await apiRegister(payload);
        console.log(response);
    };

    return (
        <div
            className="h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: "url('assets/img/bg-auth.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            {/* Form Container */}
            <div className="flex flex-col items-center justify-center h-screen relative z-10">
                <div className="w-full max-w-md bg-secondary bg-opacity-40 rounded-xl shadow-md py-6 px-6 z-20 max-h-screen">
                    <h2 className="text-[28px] font-bold text-primary mb-4 text-center">
                        {isRegister ? "Đăng ký" : "Đăng nhập"}
                    </h2>
                    <div className="flex justify-center mb-4">
                        <Link to="/">
                            <img src="assets/img/logo.png" alt="Logo" className="w-24 h-auto" />
                        </Link>
                    </div>
                    <form
                        className="flex flex-col space-y-4 overflow-y-auto"
                        style={{ maxHeight: "calc(100vh - 180px)" }} 
                    >
                        {isRegister && (
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-white text-black border border-gray-300 rounded-md p-2"
                            />
                        )}
                        {isRegister && (
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                className="bg-white text-black border border-gray-300 rounded-md p-2"
                            />
                        )}
                        <input
                            type="phone"
                            placeholder="Số điện thoại"
                            className="bg-white text-black border border-gray-300 rounded-md p-2"
                        />
                        {isRegister && (
                            <input
                                id="birthDate"
                                type="date"
                                value={birthDate || ""}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="bg-white text-black border border-gray-300 rounded-md p-2"
                            />
                        )}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                className="bg-white text-black border border-gray-300 rounded-md p-2 w-full"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2 text-gray-500"
                                onClick={togglePasswordVisibility}
                            >
                                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                        {isRegister && (
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Xác nhận mật khẩu"
                                    className="bg-white text-black border border-gray-300 rounded-md p-2 w-full"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>
                        )}
                        <Button
                            text={isRegister ? "Đăng ký" : "Đăng nhập"}
                            bgColor="bg-primary"
                            textColor="text-white"
                            fullWidth
                            onClick={handleSumit}
                        />
                        <p className="text-white mt-4 text-center">
                            {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}
                            <span
                                className="text-primary font-bold hover:underline ml-1"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                {isRegister ? "Đăng nhập" : "Đăng ký"}
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
