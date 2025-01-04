import { Link, useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { path } from "../../ultils/constant";
import Button from "../../components/button";

const Nav = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: {flag}})
  }, [])

  return (
    <nav className="bg-background relative px-4 py-4 flex justify-between items-center">
      {/* logo */}
      <Link className="text-3xl font-bold leading-none ml-10" to={path.HOME}>
        <img
          src="assets/img/logo-small.png"
          alt="logo"
          className="w-20 h-auto"
        />
      </Link>
      {/* menu */}
      <ul className="flex-grow flex justify-center space-x-20 ml-24">
        <li><Link className="text-xl text-accent hover:text-accent2" to={path.HOME}>Trang chủ</Link></li>
        <li><a className="text-xl text-accent hover:text-accent2" href="#about">Giới thiệu</a></li>
        <li><a className="text-xl text-accent hover:text-accent22" href="/">Thực đơn</a></li>
      </ul>
      <div className="flex space-x-3 md:space-x-0 rtl:space-x-reverse gap-8">
        {/* Hiển thị icon giỏ hàng và người dùng khi đã đăng nhập */}
        {isLogin ? (
          <>
            <Link to="/shopping-cart" className="text-accent hover:text-accent2">
              <CiShoppingCart className="text-3xl" />
            </Link>
            <Link to={path.LOGIN} className="text-accent hover:text-accent2">
              <CiUser className="text-3xl" />
            </Link>
            <Link to={path.LOGIN} className="text-accent hover:text-accent2">
              <IoIosLogOut className="text-3xl" />
            </Link>
            
          </>
        ) : (
          // Hiển thị nút đăng nhập và đăng ký khi chưa đăng nhập
          <div className='flex items-center gap-3'>
            <Button
              text={'Đăng nhập'}
              textColor='text-white'
              bgColor='bg-accent2'
              onClick={() => goLogin(false)} // đăng nhập
            />
            <Button
              text={'Đăng ký'}
              textColor='text-white'
              bgColor='bg-accent2'
              onClick={() => goLogin(true)} // đăng ký
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
