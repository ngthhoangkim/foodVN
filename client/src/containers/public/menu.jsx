import React, { useState, useEffect } from "react";
import {  MenuCard, Search } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getAllFood } from "../../store/actions";

const Menu = () => {
  const { categories } = useSelector((state) => state.category);
  const { role } = useSelector((state) => state.auth);
  const { foods } = useSelector((state) => state.food);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllFood());
  }, [dispatch]);

  const categoryList = [{ id: "all", categoryName: "Tất cả" }, ...categories];
  const [selectedCategories, setSelectedCategories] = useState(["Tất cả"]);

  // Xử lý chọn danh mục
  const handleCategoryChange = (categoryName) => {
    if (categoryName === "Tất cả") {
      setSelectedCategories(["Tất cả"]);
    } else {
      setSelectedCategories((prev) => {
        const isSelected = prev.includes(categoryName);
        const updated = isSelected
          ? prev.filter((c) => c !== categoryName)
          : [...prev, categoryName];

        return updated.length === 0 ? ["Tất cả"] : updated.filter((c) => c !== "Tất cả");
      });
    }
  };

  // Lọc món theo danh mục
  const filteredFoods = selectedCategories.includes("Tất cả")
    ? foods
    : foods.filter((food) => selectedCategories.includes(food.category.categoryName));

  return (
    <div className="w-full p-6 mt-28 flex gap-6">
      {/* Sidebar chọn danh mục */}
      <div className="w-1/4 bg-grayDark p-4 rounded-lg flex flex-col items-center">
        <label className="block mb-4  text-xl font-bold text-center">Chọn danh mục:</label>
        <div className="grid grid-cols-2 gap-3 w-full">
          {categoryList.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-2 cursor-pointer p-2 bg-white rounded-md shadow-md hover:bg-gray-100"
            >
              <input
                type="checkbox"
                className="accent-primary"
                checked={selectedCategories.includes(category.categoryName)}
                onChange={() => handleCategoryChange(category.categoryName)}
              />
              <span className="text-lg font-semibold">{category.categoryName}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Danh sách món ăn */}
      <div className="w-3/4">
        <div className="flex justify-center mb-6">
          <Search placeholder="Tìm kiếm món ăn" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <MenuCard
                key={food.id}
                name={food.name}
                price={food.price}
                image={food.foodImg}
                onAddToCart={() => console.log("Thêm vào giỏ", food.id)}
                onClick={() => console.log("Xem chi tiết", food.id)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Không có món ăn nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
