import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
// ROUTER
import { useParams } from "react-router-dom";
// SERVICES
import ProductService from "../services/ProductService";
// ICONS
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { saveInCartAction } from "../store/cartSlice";
import { toggleFavouriteAction } from "../store/favouritesSlice";

function SingleProductPage() {
  const [singleProduct, setSingleProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [countProduct, setCountProduct] = useState(1);

  const dispatch = useDispatch();
  let { id } = useParams();

  const favourites = useSelector(
    (state) => state.favouritesStore.allFavourites
  );
  const isFavourite = favourites.some((p) => p.id === singleProduct.id);

  useEffect(() => {
    ProductService.getSingleProduct(id)
      .then((res) => {
        setSingleProduct(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleImage(index) {
    setCurrentImage(index);
  }

  function handleProductCart() {
    const productWithQuantity = {
      ...singleProduct,
      quantity: countProduct,
      totalItemPrice:
        Math.round(singleProduct.price * countProduct * 100) / 100,
    };
    dispatch(saveInCartAction(productWithQuantity));
  }

  function handleToggleFavourite() {
    dispatch(toggleFavouriteAction(singleProduct));
  }

  return (
    <div className="px-[20px]">
      {isLoading ? (
        <div className="container mx-auto flex flex-col lg:flex-row gap-[40px] lg:gap-[20px]">
          {/* left side */}
          <div className="w-full lg:w-[50%] flex flex-col items-center">
            <img
              src={singleProduct.images[currentImage]}
              alt={singleProduct.title}
              className="max-h-[400px]"
            />
            <div className="flex items-center justify-center gap-[20px]">
              {singleProduct.images.map((el, index) => (
                <img
                  key={index}
                  src={el}
                  alt={`${singleProduct.title} ${index + 1}`}
                  className={
                    currentImage === index
                      ? "w-[100px] h-[100px] border border-mainBlue p-[10px] rounded-lg cursor-pointer"
                      : "w-[100px] h-[100px] border border-grayColor p-[10px] rounded-lg cursor-pointer"
                  }
                  onClick={() => handleImage(index)}
                />
              ))}
            </div>
          </div>

          {/* right side */}
          <div className="w-full lg:w-[50%] flex flex-col gap-[10px]">
            <h2 className="text-mainBlue text-[2rem]">{singleProduct.title}</h2>
            <h5 className="font-semibold text-[1.5rem]">
              ${singleProduct.price}
            </h5>
            <Rating
              name="read-only"
              readOnly
              value={singleProduct.rating}
              size="large"
            />

            <div className="flex items-center gap-[10px]">
              <span className="text-gray-600">Availability: </span>
              {singleProduct.stock > 0 ? (
                <h3 className="flex items-center text-[#30bd57] gap-[5px] font-semibold">
                  <FaCheck size={24} />
                  In stock
                </h3>
              ) : (
                <h3 className="flex items-center text-[#ff0000] gap-[5px] font-semibold">
                  <RxCross1 size={24} />
                  Out of stock
                </h3>
              )}
            </div>

            <p className="text-grayColor">
              Hurry up! Only{" "}
              <span className="font-extrabold text-mainBlue">
                {singleProduct.stock}
              </span>{" "}
              left in stock!
            </p>

            <div className="flex items-center gap-[20px]">
              <p className="text-gray-600">Tags:</p>
              <ul className="flex items-center gap-[10px]">
                {singleProduct.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="bg-lightGray rounded-lg px-[8px] py-[4px] text-grayColor"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-[20px]">
              <p className="text-gray-600">Quantity: </p>
              <div className="flex items-center ">
                <button
                  className="bg-lightGray text-gray-500 px-[10px] py-[4px] border border-gray-500 cursor-pointer"
                  onClick={() =>
                    setCountProduct((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                >
                  -
                </button>
                <span className="bg-lightGray text-gray-500 px-[20px] py-[4px] border border-gray-500">
                  {countProduct}
                </span>
                <button
                  className={`bg-lightGray text-gray-500 px-[10px] py-[4px] border border-gray-500 cursor-pointer ${
                    countProduct >= singleProduct.stock
                      ? "opacity-50 disabled:cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => {
                    if (countProduct < singleProduct.stock) {
                      setCountProduct((prev) => prev + 1);
                    }
                  }}
                  disabled={countProduct >= singleProduct.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center mt-[30px] gap-[30px]">
              <button
                className="bg-mainYellow text-textWhite px-[30px] py-[14px] rounded-lg cursor-pointer"
                onClick={handleProductCart}
              >
                Add To Cart
              </button>

              <button
                onClick={handleToggleFavourite}
                className="bg-[#EEEEEE] p-[10px] rounded-full cursor-pointer"
                aria-label={
                  isFavourite ? "Remove from favourites" : "Add to favourites"
                }
              >
                {isFavourite ? (
                  <IoIosHeart size={30} color="red" />
                ) : (
                  <IoIosHeartEmpty size={30} />
                )}
              </button>
            </div>

            <hr className="my-[20px] text-gray-400" />

            <div className="flex items-center gap-[20px]">
              <FaShippingFast size={26} />
              <span className="text-gray-500">
                {singleProduct.shippingInformation}
              </span>
            </div>

            <p className="font-semibold text-gray-500">
              {singleProduct.returnPolicy}
            </p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default SingleProductPage;
