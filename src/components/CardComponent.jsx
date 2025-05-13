import { Rating } from "@mui/material";

function CardComponent({ product }) {
  let randomRating = Math.floor(Math.random() * 6);
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

      {/* There was no rating in this API so i had to improvise with Math.random etc... */}
      <Rating name="read-only" value={randomRating} readOnly />

      <button className="bg-mainBlue text-textWhite px-[18px] py-[8px] rounded-lg my-[20px] hover:bg-mainYellow transition-all duration-300 cursor-pointer">
        View More
      </button>
    </div>
  );
}

export default CardComponent;
