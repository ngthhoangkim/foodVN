import React, { useState } from "react";

const PopupAddDish = ({ onClose }) => {
  const [imageName, setImageName] = useState(""); 

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-50" onClick={onClose}>
      <div data-layer="Popup thêm món ăn" className="Popup w-[600px] h-[700px] px-[40px] py-[30px] bg-[#f6f8fa] rounded-[15px] flex-col justify-start items-center gap-8 inline-flex overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div data-layer="Title" className="Title w-[456px] h-[30px] text-center text-[#1f384c] text-3xl font-medium font-['Poppins'] leading-[23px] tracking-wide">
          Thêm món ăn
        </div>

        <div className="flex flex-col gap-8 w-full">
          <div data-layer="Frame 22" className="Frame22 self-stretch h-[50px] px-[15px] py-2 bg-white rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] border border-[#b6b6b6] justify-start items-center gap-2.5 inline-flex">
            <input placeholder="Tên món ăn" className="w-full h-full bg-transparent text-[#5c5c5c] text-lg font-normal font-['Encode Sans'] leading-[25px] outline-none"/>
          </div>

          <div data-layer="Frame 23" className="Frame23 self-stretch h-[50px] px-[15px] py-2 bg-white rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] border border-[#b6b6b6] justify-start items-center gap-2.5 inline-flex">
            <input placeholder="Loại" className="w-full h-full bg-transparent text-[#5c5c5c] text-lg font-normal font-['Encode Sans'] leading-[25px] outline-none"/>
          </div>

          <div data-layer="Frame 24" className="Frame24 self-stretch h-[50px] px-[15px] py-2 bg-white rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] border border-[#b6b6b6] justify-start items-center gap-2.5 inline-flex">
            <input placeholder="Giá" className="w-full h-full bg-transparent text-[#5c5c5c] text-lg font-normal font-['Encode Sans'] leading-[25px] outline-none"
            />
          </div>

          <div
            data-layer="Frame 25"
            className="Frame25 self-stretch h-[50px] px-[15px] py-2 bg-white rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] border border-[#b6b6b6] justify-between items-center gap-2.5 inline-flex"
          >
            <input value={imageName}  placeholder="Ảnh" className="w-full h-full bg-transparent text-[#5c5c5c] text-lg font-normal font-['Encode Sans'] leading-[25px] outline-none" readOnly/>
            <label htmlFor="file-input" className="cursor-pointer">
              <img src={`${process.env.PUBLIC_URL}/images/folder.png`} alt="Ảnh" className="w-6 h-6"/>
            </label>
            <input type="file" id="file-input" className="hidden" accept="image/*" onChange={(e) => { const file = e.target.files[0];
                if (file) { setImageName(file.name); }
                }}
            />
          </div>

          <div data-layer="Frame 26" className="Frame26 self-stretch h-[120px] px-[15px] py-2 bg-white rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] border border-[#b6b6b6] justify-start items-center gap-2.5 inline-flex">
            <input placeholder="Chi tiết" className="w-full h-full bg-transparent text-[#5c5c5c] text-lg font-normal font-['Encode Sans'] leading-[25px] outline-none"/>
          </div>
        </div>

        <div data-layer="Frame 31" className="Frame31 self-stretch h-[50px] bg-gradient-to-r from-[#ffb330] to-[#fffcce] rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] border border-[#a7a7a7] justify-center items-center inline-flex cursor-pointer mt-4" onClick={onClose}>
          <div data-layer="Thêm" className="ThM text-center text-[#1f384c] text-lg text-3xl font-medium font-['Inter'] leading-normal">
            Thêm
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailFood = () => {
  const [showPopupAddDish, setShowPopupAddDish] = useState(false);

  return (
    <div className="relative bg-[#f6f8fa] w-full h-full overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mt-6 ml-[200px] p-4 rounded-[10px]">
          <h1 className="text-3xl font-semibold text-[#1f384c] font-['Poppins'] pl-[55px]">
            Món ăn
          </h1>
          <div data-layer="+"  className="w-12 h-12 flex justify-center items-center text-[#f2af29] text-[40px] font-medium font-['Poppins'] leading-none bg-[#f2af29]/50 rounded-full cursor-pointer"
            onClick={() => setShowPopupAddDish(true)}
          >+</div>
        </div>

        <div className="grid grid-cols-4 gap-8 pl-[280px] pr-[50px] mt-[50px] w-full">
          <div className="Group342 w-[250px] h-[300px] relative">
            <div className="Rectangle27 w-[250px] h-[300px] left-0 top-0 absolute bg-[#010039]/5 rounded-[10px]" />
            <div className="TN w-[169px] left-[40px] top-[222px] absolute text-center text-[#1f384c] text-3xl font-medium font-['Poppins'] leading-[23px] tracking-wide"> CocaCola</div>
            <div className="Gia w-32 left-[59px] top-[270px] absolute text-center text-[#1f384c] text-xl font-medium font-['Poppins'] leading-[23px] tracking-wide">
                15.000 VND
            </div>
              <img className="Image w-[250px] h-[200px] left-0 top-0 absolute" src={`${process.env.PUBLIC_URL}/img/sushi.jpg`} alt="CocaCola"/>
          </div>

          <div className="Group342 w-[250px] h-[300px] relative">
            <div className="Rectangle27 w-[250px] h-[300px] left-0 top-0 absolute bg-[#010039]/5 rounded-[10px]" />
            <div className="TN w-[169px] left-[40px] top-[222px] absolute text-center text-[#1f384c] text-3xl font-medium font-['Poppins'] leading-[23px] tracking-wide"> CocaCola</div>
            <div className="Gia w-32 left-[59px] top-[270px] absolute text-center text-[#1f384c] text-xl font-medium font-['Poppins'] leading-[23px] tracking-wide">
                15.000 VND
            </div>
              <img className="Image w-[250px] h-[200px] left-0 top-0 absolute" src={`${process.env.PUBLIC_URL}/images/sushi.jpg`} alt="CocaCola"/>
          </div>

          <div className="Group342 w-[250px] h-[300px] relative">
            <div className="Rectangle27 w-[250px] h-[300px] left-0 top-0 absolute bg-[#010039]/5 rounded-[10px]" />
            <div className="TN w-[169px] left-[40px] top-[222px] absolute text-center text-[#1f384c] text-3xl font-medium font-['Poppins'] leading-[23px] tracking-wide"> CocaCola</div>
            <div className="Gia w-32 left-[59px] top-[270px] absolute text-center text-[#1f384c] text-xl font-medium font-['Poppins'] leading-[23px] tracking-wide">
                15.000 VND
            </div>
              <img className="Image w-[250px] h-[200px] left-0 top-0 absolute" src={`${process.env.PUBLIC_URL}/images/sushi.jpg`} alt="CocaCola"/>
          </div>

          <div className="Group342 w-[250px] h-[300px] relative">
            <div className="Rectangle27 w-[250px] h-[300px] left-0 top-0 absolute bg-[#010039]/5 rounded-[10px]" />
            <div className="TN w-[169px] left-[40px] top-[222px] absolute text-center text-[#1f384c] text-3xl font-medium font-['Poppins'] leading-[23px] tracking-wide"> CocaCola</div>
            <div className="Gia w-32 left-[59px] top-[270px] absolute text-center text-[#1f384c] text-xl font-medium font-['Poppins'] leading-[23px] tracking-wide">
                15.000 VND
            </div>
              <img className="Image w-[250px] h-[200px] left-0 top-0 absolute" src={`${process.env.PUBLIC_URL}/images/sushi.jpg`} alt="CocaCola"/>
          </div>

          <div className="Group342 w-[250px] h-[300px] relative">
            <div className="Rectangle27 w-[250px] h-[300px] left-0 top-0 absolute bg-[#010039]/5 rounded-[10px]" />
            <div className="TN w-[169px] left-[40px] top-[222px] absolute text-center text-[#1f384c] text-3xl font-medium font-['Poppins'] leading-[23px] tracking-wide"> CocaCola</div>
            <div className="Gia w-32 left-[59px] top-[270px] absolute text-center text-[#1f384c] text-xl font-medium font-['Poppins'] leading-[23px] tracking-wide">
                15.000 VND
            </div>
              <img className="Image w-[250px] h-[200px] left-0 top-0 absolute" src={`${process.env.PUBLIC_URL}/images/sushi.jpg`} alt="CocaCola"/>
          </div>
      </div>
</div>

      {/* Popup Add Dish */}
      {showPopupAddDish && <PopupAddDish onClose={() => setShowPopupAddDish(false)} />}
    </div>
  );
};

export default DetailFood;
