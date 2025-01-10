import React, { useRef, useEffect } from 'react';
import Nav from '../public/nav';
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';


const Home = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const aboutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className='w-full overflow-hidden'>
      {/* navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>
      {/* home page */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
