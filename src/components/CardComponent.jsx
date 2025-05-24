import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

function CardComponent({ product, isGrid }) {
  return (
    <div
      className={
        isGrid === "gridView"
          ? "w-[400px] mx-5 mt-5 md:mt-0 md:mx-0 border border-grayColor rounded-[20px] flex flex-col items-center justify-center"
          : "w-full flex items-center border border-grayColor justify-between px-[10px] rounded-lg"
      }
    >
      <div className="w-[full]">
        <img
          src={product.thumbnail}
          alt=""
          className={
            isGrid === "gridView"
              ? "w-[full] h-[200px] object-cover"
              : "h-[100px] object-cover lg:h-[200px]"
          }
        />
      </div>
      {isGrid === "listView" ? (
        <>
          <h3 className="hidden lg:flex ">{product.title}</h3>
          <h4 className="hidden lg:flex ">${product.price}</h4>
        </>
      ) : (
        <>
          <h3>{product.title}</h3>
          <h4 className="font-bold">${product.price}</h4>
        </>
      )}

      <Rating name="read-only" readOnly value={product.rating} />

      <Link
        to={`/singleProduct/${product.id}`}
        className="bg-mainBlue text-textWhite px-[18px] py-[8px] rounded-lg my-[20px] hover:bg-mainYellow transition-all duration-300 cursor-pointer"
      >
        View More
      </Link>
    </div>
  );
}

export default CardComponent;
