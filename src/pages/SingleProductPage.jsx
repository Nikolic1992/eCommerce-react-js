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

function SingleProductPage() {
  const [singleProduct, setSingleProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [countProduct, setCountProduct] = useState(1);
  let { id } = useParams();

  useEffect(() => {
    ProductService.getSingleProduct(id)
      .then((res) => {
        setSingleProduct(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleImage(index) {
    setCurrentImage(index);
  }

  return (
    <div className="px-[20px]">
      {isLoading ? (
        <div className="container mx-auto flex flex-col lg:flex-row gap-[40px] lg:gap-[20px]">
          {/* left side */}
          <div className="w-full lg:w-[50%] flex flex-col items-center">
            <img
              src={singleProduct.images[currentImage]}
              alt=""
              className="max-h-[400px]"
            />
            <div className="flex items-center justify-center gap-[20px]">
              {singleProduct.images.map((el, index) => {
                return (
                  <img
                    key={index}
                    src={el}
                    alt=""
                    className={
                      currentImage === index
                        ? "w-[100px] h-[100px]  border border-mainBlue p-[10px] rounded-lg"
                        : "w-[100px] h-[100px] border border-grayColor p-[10px] rounded-lg cursor-pointer"
                    }
                    onClick={() => handleImage(index)}
                  />
                );
              })}
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
                {singleProduct.tags.map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className="bg-lightGray rounded-lg px-[8px] py-[4px] text-grayColor"
                    >
                      #{tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex items-center gap-[20px]">
              <p className="text-gray-600">Quantity: </p>
              <div className="flex items-center ">
                <button className="bg-lightGray text-gray-500 px-[10px] py-[4px] border border-gray-500 cursor-pointer">
                  -
                </button>
                <span className="bg-lightGray text-gray-500 px-[20px] py-[4px] border border-gray-500">
                  {countProduct}
                </span>
                <button className="bg-lightGray text-gray-500 px-[10px] py-[4px] border border-gray-500 cursor-pointer">
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center mt-[30px] gap-[30px]">
              <button className="bg-mainYellow text-textWhite px-[30px] py-[14px] rounded-lg cursor-pointer">
                Add To Cart
              </button>
              <div className="bg-[#EEEEEE] p-[10px] rounded-full cursor-pointer">
                <IoIosHeartEmpty size={30} />
              </div>
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
