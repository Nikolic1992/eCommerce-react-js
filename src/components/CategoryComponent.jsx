import { useEffect, useState } from "react";

// SERVICES
import CategoryService from "../services/CategoryService";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { saveAllCategoryAction } from "../store/categorySlice";
import { saveSelectCategoryAction } from "../store/productSlice";

function CategoryComponent() {
  const [toggleCategory, setToggleCategory] = useState(false);
  const { allCategory, isLoading } = useSelector(
    (state) => state.categoryStore
  );

  const dispatch = useDispatch();
  useEffect(() => {
    CategoryService.getAllCategory()
      .then((res) => {
        dispatch(saveAllCategoryAction(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  function handleToggleCategory() {
    setToggleCategory(!toggleCategory);
  }
  return (
    <div className="bg-lightGray flex items-center h-[100%] py-[10px]">
      <div className="container mx-auto flex items-center gap-[20px] h-full flex-col lg:flex-row">
        <button
          className="bg-mainBlue px-[20px] py-[10px] text-textWhite rounded-lg cursor-pointer hover:bg-mainYellow transition-all duration-500"
          onClick={handleToggleCategory}
        >
          Show Categories
        </button>

        {isLoading ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[10px]">
            {toggleCategory && (
              <>
                <li
                  onClick={() => dispatch(saveSelectCategoryAction(""))}
                  className="w-[200px] bg-mainBlue text-textWhite text-center rounded-lg px-[16px] py-[8px] hover:bg-mainYellow transition-all duration-500 cursor-pointer"
                >
                  All Categories
                </li>

                {allCategory.map((cat, index) => {
                  return (
                    <li
                      key={index}
                      className="w-[200px] bg-mainBlue text-textWhite text-center rounded-lg px-[16px] py-[8px] hover:bg-mainYellow transition-all duration-500 cursor-pointer"
                      onClick={() =>
                        dispatch(saveSelectCategoryAction(cat.name))
                      }
                    >
                      {cat.name}
                    </li>
                  );
                })}
              </>
            )}
          </ul>
        ) : (
          <div>Loading Categories...</div>
        )}
      </div>
    </div>
  );
}

export default CategoryComponent;
