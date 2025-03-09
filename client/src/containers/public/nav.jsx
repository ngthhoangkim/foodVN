import { Link, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import { CiShoppingCart, CiUser,CiViewList  } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { path } from "../../ultils/constant";
import Button from "../../components/button";
import { useSelector, useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import * as actions from '../../store/actions';

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, id } = useSelector(state => state.auth);
  const { count } = useSelector((state) => state.cart || {});
  const { order } = useSelector((state) => state.order);

  const goLogin = useCallback((flag) => {
    navigate(`/${path.LOGIN}`, { state: { flag } });
  }, []);

  const handleLogout = () => {
    dispatch(actions.logout());
    navigate('/');
  };

  useEffect(() => {
    if (id) {
      dispatch(actions.getOrder(id));
    }
  }, [id, dispatch]);

  return (
    <nav className="bg-gradientPrimary relative px-4 py-4 flex justify-between items-center">
      {/* logo */}
      <Link className="text-3xl font-bold leading-none ml-10" to={'/'}>
        <img src="/assets/img/logoden.png" alt="logo" className="w-20 h-auto" />
      </Link>

      {/* menu */}
      <ul className="flex-grow flex justify-center space-x-20 ml-24">
        <li><Link className="text-xl font-bold text-txtCard hover:text-accent2" to={'/'}>Trang chủ</Link></li>
        <li><a className="text-xl text-txtCard font-bold hover:text-accent2" href="/#about">Giới thiệu</a></li>
        <li><Link className="text-xl text-txtCard font-bold hover:text-accent2" to={`/${path.MENU}`}>Thực đơn</Link></li>
      </ul>

      <div className="flex space-x-6 items-center">
        {isLoggedIn && order?.table?.tableNumber && (
          <motion.div
            className="relative overflow-hidden border-2 border-primary text-txtCard py-2 px-6 rounded-lg font-semibold text-sm transition-all duration-300 group"
          >
            <span className="relative z-10 group-hover:text-txtCard">
              Gọi phục vụ bàn {order.table.tableNumber}
            </span>
            <span className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </motion.div>
        )}

        {isLoggedIn ? (
          <>
          {/* đơn hàng */}
            <div className="relative flex items-center space-x-2">
              <Link to={`/${path.ORDER}`} className="text-txtCard hover:text-accent2">
                <CiViewList className="text-3xl" />
              </Link>
            </div>

            <Link to={`/${path.SHOPPING_CART}`} className="relative text-txtCard hover:text-accent2">
              <CiShoppingCart className="text-3xl" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-txtCard text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Hiển thị icon user */}
            <div className="relative flex items-center space-x-2">
              <Link to={`/${path.PROFILE}`} className="text-txtCard hover:text-accent2">
                <CiUser className="text-3xl" />
              </Link>
            </div>

            <button onClick={handleLogout} className="text-txtCard hover:text-accent2">
              <IoIosLogOut className="text-3xl" />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Button text="Đăng nhập" textColor="text-white" bgColor="bg-accent2" onClick={() => goLogin(false)} />
            <Button text="Đăng ký" textColor="text-white" bgColor="bg-accent2" onClick={() => goLogin(true)} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
