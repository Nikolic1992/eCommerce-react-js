import { useEffect, useState } from "react";

// SERVICES
import CategoryService from "../services/CategoryService";

function CategoryComponent() {
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    CategoryService.getAllCategory()
      .then((res) => {
        setAllCategory(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bg-lightGray flex items-center h-[70px]">
      <div className="container mx-auto flex items-center gap-[20px]">
        <button className="bg-mainBlue px-[20px] py-[10px] text-textWhite rounded-lg cursor-pointer">
          Show Category
        </button>

        {isLoading ? <div>Category</div> : <div>Loading categories...</div>}
      </div>
    </div>
  );
}

export default CategoryComponent;
