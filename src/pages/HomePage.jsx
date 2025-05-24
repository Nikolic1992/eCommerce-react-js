import { useEffect, useState } from "react";
// SERVICES
import ProductService from "../services/ProductService";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { saveAllProductsAction } from "../store/productSlice";

// ICONS
import { FaList } from "react-icons/fa";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";

import CardComponent from "../components/CardComponent";

function HomePage() {
  const [isGrid, setIsGrid] = useState("gridView");
  const [limitProducts, setLimitProducts] = useState(9);
  const { allProducts, isLoading, selectCategory, searchProduct } = useSelector(
    (state) => state.productStore
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchProduct.trim()) {
          const res = await ProductService.getProductsBySearch(searchProduct);
          dispatch(saveAllProductsAction(res.data.products));
        } else if (selectCategory) {
          const res = await ProductService.getAllProductsByCategory(
            selectCategory
          );
          dispatch(saveAllProductsAction(res.data.products));
        } else {
          const res = await ProductService.getAllProductsService(limitProducts);
          dispatch(saveAllProductsAction(res.data.products));
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [searchProduct, selectCategory, limitProducts, dispatch]);

  return (
    <div className="container mx-auto">
      <div>
        <span className="flex items-center justify-end py-[20px] gap-[20px]">
          <FaList
            size={24}
            onClick={() => setIsGrid("listView")}
            className={
              isGrid === "listView" ? "bg-mainYellow p-[3px] rounded-lg " : ""
            }
          />
          <TfiLayoutGrid3Alt
            size={24}
            onClick={() => setIsGrid("gridView")}
            className={
              isGrid === "gridView" ? "bg-mainYellow p-[3px] rounded-lg " : ""
            }
          />
        </span>
      </div>
      {isLoading ? (
        <div
          className={
            isGrid === "gridView"
              ? "flex flex-wrap items-center justify-center gap-[10px] "
              : "flex flex-col items-center justify-center gap-[10px]"
          }
        >
          {allProducts.map((product) => {
            return (
              <CardComponent
                key={product.id}
                product={product}
                isGrid={isGrid}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
      {!searchProduct && !selectCategory && isLoading && (
        <div className="flex items-center justify-center py-[50px]">
          <button
            className="bg-mainBlue px-[20px] py-[10px] text-textWhite rounded-lg cursor-pointer hover:bg-mainYellow transition-all duration-500"
            onClick={() => setLimitProducts(limitProducts + 9)}
          >
            View More Products
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
