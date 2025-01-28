import React, { useState, useEffect } from "react";
import { FoodCard, Search } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getAllFood } from "../../store/actions";


const Menu = () => {
  const { categories } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const { role } = useSelector(state => state.auth)
  const { foods } = useSelector((state) => state.food); 
  const categoryList = [{ id: "all", categoryName: "Tất cả" }, ...categories];

  //get all 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllFood());
  }, [dispatch]);

  //lọc món theo danh mục
  const filteredFoods = selectedCategory === "Tất cả"
  ? foods
  : foods.filter(food => food.category.categoryName === selectedCategory);

  return (
    <div className="w-full p-6 mt-28">
      <div className="flex justify-center mb-6 ml-12">
        <Search
          placeholder={"Tìm kiếm món ăn"}
        />
      </div>
      <div className="flex justify-center gap-4 flex-wrap">
        {categoryList.map((category) => (
          <div
            key={category.id}
            className={`px-4 py-2 rounded-lg cursor-pointer transition ${selectedCategory === category.categoryName
              ? "bg-primary text-white"
              : "bg-grey text-txtCard hover:bg-primary hover:text-white"
              }`}
            onClick={() => setSelectedCategory(category.categoryName)}
          >
            {category.categoryName}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredFoods.map((food) => (
          <FoodCard
            key={food.id}
            name={food.name}
            price={food.price}
            image={food.foodImg}
            role={role}
            onAddToCart={() => console.log("Thêm vào giỏ", food.id)}
            onClick={() => console.log("Xem chi tiết", food.id)}
          />
        ))}
      </div>
    </div>
  );
};
export default Menu;