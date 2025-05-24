import { useRef, useState } from "react";
// Material UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCartAction,
  increaseQuantityAction,
  decreaseQuantityAction,
} from "../store/cartSlice";

// ICONS
import { RxCross1 } from "react-icons/rx";

function CartPage() {
  const [activeCode, setActiveCode] = useState("");
  const couponRef = useRef();
  const { cart, totalPrice } = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();

  function handleRemoveProduct(product) {
    dispatch(deleteFromCartAction(product));
  }

  function handleApplyCoupon() {
    setActiveCode(couponRef.current.value);
    couponRef.current.value = "";
  }

  return (
    <div className="mt-[50px]">
      <div className="container mx-auto flex flex-col lg:flex-row gap-[20px]">
        <TableContainer component={Paper} className="w-full lg:w-[70%]">
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead className="bg-mainBlue">
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Products
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  Subtotal
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="right"
                >
                  Remove
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="w-[90px] h-[90px] border border-mainBlue rounded-lg"
                    />
                  </TableCell>
                  <TableCell align="center">${product.price}</TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center">
                      <button
                        className="bg-slate-300 text-[18px] px-[8px] py-[4px] border border-gray-500 cursor-pointer"
                        onClick={() =>
                          dispatch(decreaseQuantityAction(product))
                        }
                      >
                        -
                      </button>
                      <span className="bg-slate-300 text-[18px] px-[20px] py-[4px] border border-gray-500">
                        {product.quantity}
                      </span>
                      <button
                        className="bg-slate-300 text-[18px] px-[8px] py-[4px] border border-gray-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() =>
                          dispatch(increaseQuantityAction(product))
                        }
                        disabled={product.quantity >= product.stock} // disables button if quantity >= stock
                      >
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    ${product.totalItemPrice}
                  </TableCell>
                  <TableCell align="right">
                    <button>
                      <RxCross1
                        size={24}
                        className="text-[#ff0000] mr-[8px] cursor-pointer"
                        onClick={() => handleRemoveProduct(product)}
                      />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* INFO / CART */}
        <div className="w-full lg:w-[30%]">
          <h2 className="text-textWhite bg-mainBlue py-[16px] text-center rounded-md">
            CART TOTAL
          </h2>
          <span className="text-center text-[28px] font-extrabold">
            Total Price: $
            {activeCode === "discount" ? totalPrice / 2 : totalPrice}
          </span>
          <div className="flex flex-col">
            <input
              ref={couponRef}
              type="text"
              placeholder="Insert Coupon..."
              className="p-[10px] border border-grayColor rounded-lg placeholder:text-mainBlue outline-none mt-[20px]"
            />
            <span className="text-[14px] text-grayColor">
              Insert coupon for 50% discount!
            </span>
            <button
              className={
                activeCode === "discount"
                  ? "bg-grayColor  text-black px-[16px] py-[8px] rounded-lg transition-all duration-300 cursor-not-allowed mt-[30px]"
                  : "bg-mainBlue hover:bg-mainYellow text-white px-[16px] py-[8px] rounded-lg transition-all duration-300 cursor-pointer mt-[30px]"
              }
              onClick={handleApplyCoupon}
              disabled={activeCode === "discount"}
            >
              {activeCode === "discount" ? "Coupon Applied!" : "Apply Coupon"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
