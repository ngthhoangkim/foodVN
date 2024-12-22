import "../css/index.css";
import React from "react";
import { CiShoppingCart, CiUser, CiMenuBurger } from "react-icons/ci";

function Nav() {
    return (
        <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="assets/img/logo-small.jpg" alt="logo" className="w-20 h-auto"/>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-5">
                    <a href="#" className="text-[#C7253E] hover:text-[#FF6969]">
                        <CiShoppingCart className="text-3xl" />
                    </a>
                    <a href="#" className="text-[#C7253E] hover:text-[#FF6969]">
                        <CiUser className="text-3xl" />
                    </a>
                    
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 text-xl font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <a href="#" className="block py-2 px-3 text-[#C7253E] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF6969] md:p-0">Trang trủ</a>
                        </li>
                        <li>
                            <a href="#about" className="block py-2 px-3 text-[#C7253E] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF6969] md:p-0">Giới thiệu</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-[#C7253E] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF6969] md:p-0">Thực đơn</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Nav;