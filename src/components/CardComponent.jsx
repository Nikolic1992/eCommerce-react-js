import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

function CardComponent({ product }) {
  return (
    <div className="w-[400px] border border-grayColor rounded-[20px] flex flex-col items-center justify-center">
      <div className="w-[full]">
        <img
          src={product.images[0]}
          alt=""
          className="w-[full] h-[200px] object-cover"
        />
      </div>
      <h3>{product.title}</h3>
      <h4>${product.price}</h4>

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
