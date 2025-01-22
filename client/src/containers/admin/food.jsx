import React, { useState } from "react";

const MenuItem = ({ title, gradient, className }) => (
  <div className={`w-[200px] h-[100px] ${className} relative`}>
    <div
      className={`w-full h-full bg-gradient-to-br ${gradient} rounded-[10px] absolute`}
    />
    <div className="absolute w-[149px] left-[25px] top-[37px] text-center text-[#1f384c] text-2xl font-semibold font-['Poppins'] leading-[27px] tracking-tight">
      {title}
    </div>
  </div>
);

const PopupAddType = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50" onClick={onClose}>
    <div data-layer="Popup thêm loại" className="PopupThMLoI w-[300px] h-[300px] relative bg-[#f6f8fa] rounded-[20px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
      <div data-layer="Title" className="Title w-[171px] left-[64px] top-[44px] absolute text-center text-[#1f384c] text-[28px] font-medium font-['Poppins'] leading-[23px] tracking-wide">
        Thêm loại
      </div>
      <div data-layer="Frame 21" className="Frame21 w-[243px] h-[63px] px-[23px] py-2.5 left-[28px] top-[99px] absolute bg-white rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] border border-[#b6b6b6] justify-start items-center gap-2.5 inline-flex">
        <input placeholder="Tên loại" className="w-full h-full bg-transparent text-[#5c5c5c] text-lg font-normal font-['Encode Sans'] leading-[25px] outline-none"/>
      </div>
      <div data-layer="Frame 31" className="Frame31 w-[243px] h-[63px] px-[23px] py-2.5 left-[28px] top-[192px] absolute bg-gradient-to-r from-[#ffb330] to-[#fffcce] rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] border border-[#a7a7a7] justify-center items-center gap-2.5 inline-flex cursor-pointer" onClick={onClose}>
        <div data-layer="Thêm" className="ThM text-center text-[#1f384c] text-xl font-normal font-['Inter'] leading-normal">
          Thêm
        </div>
      </div>
    </div>
  </div>
);

const MenuPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative bg-[#f6f8fa] w-full h-full overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mt-6 ml-[200px] p-4 rounded-[10px]">
          <h1 className="text-3xl font-semibold text-[#1f384c] font-['Poppins'] pl-[55px]">Thực đơn</h1>
          <div data-layer="+" className="w-12 h-12 flex justify-center items-center text-[#f2af29] text-[40px] font-medium font-['Poppins'] leading-none bg-[#f2af29]/50 rounded-full cursor-pointer" onClick={() => setShowPopup(true)}>+</div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-4 gap-x-16 gap-y-12 pl-[280px] pr-[100px] mt-[50px] w-full">
          <MenuItem title="Đồ uống" gradient="from-[#ffb330] to-[#fffcce]" />
          <MenuItem title="Gỏi" gradient="from-[#ffb330] to-[#fffcce]" />
          <MenuItem title="Món nướng" gradient="from-[#ffb330] to-[#fffcce]" />
          <MenuItem title="Cơm quê" gradient="from-[#ffb330] to-[#fffcce]" />
          <MenuItem title="Menu trẻ em" gradient="from-[#ffb330] to-[#fffcce]" />
          <MenuItem title="Món hấp" gradient="from-[#ffb330] to-[#fffcce]" />
          <MenuItem title="Lẩu" gradient="from-[#ffb330] to-[#fffcce]" />
          <MenuItem title="Đặc sản 3 miền" gradient="from-[#ffb330] to-[#fffcce]" />
          <MenuItem title="Đồ chay" gradient="from-[#ffb330] to-[#fffcce]" />
          <MenuItem title="Hải sản" gradient="from-[#ffb330] to-[#fffcce]" />
        </div>
      </div>

      {/* Popup Add Type */}
      {showPopup && <PopupAddType onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default MenuPage;
