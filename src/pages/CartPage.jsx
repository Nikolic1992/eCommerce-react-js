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
  const { cart, totalPrice } = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();

  function handleRemoveProduct(product) {
    dispatch(deleteFromCartAction(product));
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

        <div className="w-full lg:w-[30%]">
          <h2 className="text-[24px] font-semibold mb-2">CART TOTAL</h2>
          <div className="text-[20px]">
            <span className="font-medium">Total Price:</span>{" "}
            <span className="font-bold">${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
