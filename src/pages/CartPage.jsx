import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

// ICONS
import { RxCross1 } from "react-icons/rx";

function CartPage() {
  // LOCAL STORAGE

  const { cart } = useSelector((state) => state.cartStore);
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
                  key={product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="product">
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="w-[90px] h-[90px] border border-mainBlue rounded-lg"
                    />
                  </TableCell>
                  <TableCell align="center">${product.price}</TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center">
                      <button className="bg-slate-300 text-[18px] px-[8px] py-[4px] border border-gray-500 cursor-pointer">
                        -
                      </button>
                      <span className="bg-slate-300 text-[18px] px-[20px] py-[4px] border border-gray-500">
                        {product.count}
                      </span>
                      <button className="bg-slate-300 text-[18px] px-[8px] py-[4px] border border-gray-500 cursor-pointer">
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="center">${product.cartTotal}</TableCell>
                  <TableCell align="right">
                    <button>
                      <RxCross1
                        size={24}
                        className="text-[#ff0000] mr-[8px] cursor-pointer"
                      />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="w-full lg:w-[30%]">
          <h2>CART TOTAL</h2>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
