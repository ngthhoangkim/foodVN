import Nav from "../components/nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {


  return (
    <div className="relative w-full bg-gray-50">
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Header Section */}
      <div className="w-full relative bg-white overflow-hidden">
        <div className="w-full h-[410px] bg-cover bg-center" style={{ backgroundImage: "url('/assets/img/sushi.jpg')" }}></div>
        <div className="w-full h-[410px] absolute top-0 bg-[#1e1e1e]/50"></div>
        <div className="w-full h-[410px] absolute top-0 flex justify-center items-center">
          <div className="text-white text-5xl font-bold font-['Open Sans'] leading-[56px]">
            Thực đơn
          </div>
        </div>
      </div>

      <div className="w-full flex pt-10">
        <div className="w-4/5 flex flex-wrap gap-12 px-16 py-10">
          <div className="w-[320px] h-[330px] bg-white shadow-lg rounded-md overflow-hidden">
            <img
              className="w-full h-[267px] object-cover"
              src="/assets/img/sushi.jpg"
              alt="Fresh Lime"
            />
            <div className="px-4 py-3">
              <div className="text-lg font-bold text-gray-800">Fresh Lime</div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">$38.00</span>
                <span className="text-gray-400 line-through">$45.00</span>
              </div>
            </div>
          </div>

          <div className="w-[320px] h-[330px] bg-white shadow-lg rounded-md overflow-hidden">
            <img
              className="w-full h-[267px] object-cover"
              src="/assets/img/anh1.jpeg"
              alt="Fresh Lime"
            />
            <div className="px-4 py-3">
              <div className="text-lg font-bold text-gray-800">Fresh Lime</div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">$38.00</span>
                <span className="text-gray-400 line-through">$45.00</span>
              </div>
            </div>
          </div>

          <div className="w-[320px] h-[330px] bg-white shadow-lg rounded-md overflow-hidden">
            <img
              className="w-full h-[267px] object-cover"
              src="/assets/img/sushi.jpg"
              alt="Fresh Lime"
            />
            <div className="px-4 py-3">
              <div className="text-lg font-bold text-gray-800">Fresh Lime</div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">$38.00</span>
                <span className="text-gray-400 line-through">$45.00</span>
              </div>
            </div>
          </div>

          <div className="w-[320px] h-[330px] bg-white shadow-lg rounded-md overflow-hidden">
            <img
              className="w-full h-[267px] object-cover"
              src="/assets/img/anh1.jpeg"
              alt="Fresh Lime"
            />
            <div className="px-4 py-3">
              <div className="text-lg font-bold text-gray-800">Fresh Lime</div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">$38.00</span>
                <span className="text-gray-400 line-through">$45.00</span>
              </div>
            </div>
          </div>

          <div className="w-[320px] h-[330px] bg-white shadow-lg rounded-md overflow-hidden">
            <img
              className="w-full h-[267px] object-cover"
              src="/assets/img/sushi.jpg"
              alt="Fresh Lime"
            />
            <div className="px-4 py-3">
              <div className="text-lg font-bold text-gray-800">Fresh Lime</div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">$38.00</span>
                <span className="text-gray-400 line-through">$45.00</span>
              </div>
            </div>
          </div>

          <div className="w-[320px] h-[330px] bg-white shadow-lg rounded-md overflow-hidden">
            <img
              className="w-full h-[267px] object-cover"
              src="/assets/img/anh1.jpeg"
              alt="Fresh Lime"
            />
            <div className="px-4 py-3">
              <div className="text-lg font-bold text-gray-800">Fresh Lime</div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">$38.00</span>
                <span className="text-gray-400 line-through">$45.00</span>
              </div>
            </div>
          </div>

          <div className="w-[320px] h-[330px] bg-white shadow-lg rounded-md overflow-hidden">
            <img
              className="w-full h-[267px] object-cover"
              src="/assets/img/sushi.jpg"
              alt="Fresh Lime"
            />
            <div className="px-4 py-3">
              <div className="text-lg font-bold text-gray-800">Fresh Lime</div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">$38.00</span>
                <span className="text-gray-400 line-through">$45.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-1/5 px-10 pt-10">
          <div className="bg-white shadow-md rounded-md p-6">
            <div className="mb-4 relative">
              <input type="text" placeholder="Tìm kiếm..." className="w-full p-2 pl-3 pr-10 border border-gray-300 rounded-md"/>
              <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
                <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xl font-bold text-gray-800 mb-4">Thực đơn</div>
            <div className="space-y-4">
              {[
                "Khai vị",
                "Món nước",
                "Lẩu",
                "Cơm",
                "Hải sản",
                "Món nướng",
                "Thức uống",
                "Đồ ăn kèm",
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`menu-item-${index}`}
                    className="w-4 h-4 border-gray-300 rounded mr-2"
                  />
                  <label
                    htmlFor={`menu-item-${index}`}
                    className="text-lg text-gray-800"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
);
};
export default Menu;