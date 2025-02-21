import { Link, useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { path } from "../../ultils/constant";
import Button from "../../components/button";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Nav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth)
  const goLogin = useCallback((flag) => {
    navigate(`/${path.LOGIN}`, { state: { flag } })
  }, [])
  const handleLogout = () => {
    dispatch(actions.logout()); // Gọi action logout từ Redux
    navigate('/');
  };

  return (
    <nav className="bg-background relative px-4 py-4 flex justify-between items-center">
      {/* logo */}
      <Link className="text-3xl font-bold leading-none ml-10" to={'/'}>
        <img
          src="assets/img/logo-small.png"
          alt="logo"
          className="w-20 h-auto"
        />
      </Link>
      {/* menu */}
      <ul className="flex-grow flex justify-center space-x-20 ml-24">
        <li><Link className="text-xl text-accent hover:text-accent2" to={'/'}>Trang chủ</Link></li>
        <li><a className="text-xl text-accent hover:text-accent2" href="/#about">Giới thiệu</a></li>
        <li><Link className="text-xl text-accent hover:text-accent22" to={`/${path.MENU}`}>Thực đơn</Link></li>
      </ul>
      <div className="flex space-x-3 md:space-x-0 rtl:space-x-reverse gap-8">
        {/* Hiển thị icon giỏ hàng và người dùng khi đã đăng nhập */}
        {isLoggedIn ? (
          <>
            <Link to={`/${path.SHOPPING_CART}`} className="text-accent hover:text-accent2">
              <CiShoppingCart className="text-3xl" />
            </Link>
            <Link to={`/${path.PROFILE}`} className="text-accent hover:text-accent2">
              <CiUser className="text-3xl" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-accent hover:text-accent2"
            >
              <IoIosLogOut className="text-3xl" />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              text="Đăng nhập"
              textColor="text-white"
              bgColor="bg-accent2"
              onClick={() => goLogin(false)} // đăng nhập
            />
            <Button
              text="Đăng ký"
              textColor="text-white"
              bgColor="bg-accent2"
              onClick={() => goLogin(true)} // đăng ký
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
