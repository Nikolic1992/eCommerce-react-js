// LOGO
import logo from "../assets/logo.png";
// CLERK
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

// ICONS
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";

function NavBarComponent() {
  return (
    <div className=" bg-mainBlue h-full lg:h-[100px] flex items-center py-[10px]">
      {/* Logo */}
      <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row gap-[15px]">
        <img src={logo} alt="Logo image - ELECTRON" />

        {/* Search bar*/}
        <div className="bg-textWhite rounded-[20px]">
          <input
            type="text"
            placeholder="Search items here..."
            className="bg-transparent outline-none px-[25px] py-[15px] rounded-[20px] placeholder:text-mainYellow text-mainBlue"
          />
          <button className="bg-mainYellow text-textWhite px-[25px] py-[15px] rounded-[20px]">
            Search
          </button>
        </div>

        {/* Login, Cart, Favourites */}
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <CiUser color="white" size={24} />{" "}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>
          <div className="flex items-center gap-[5px]">
            <CiHeart color="white" size={24} />
            <span className="w-[20px] h-[20px] flex items-center justify-center bg-mainYellow text-textWhite rounded-full">
              0
            </span>{" "}
            <span className="text-textWhite text-[18px]">Favourites</span>
          </div>
          <div className="flex items-center gap-[5px]">
            <CiShoppingCart color="white" size={24} />
            <span className="w-[20px] h-[20px] flex items-center justify-center bg-mainYellow text-textWhite rounded-full">
              0
            </span>{" "}
            <span className="text-textWhite text-[18px]">Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarComponent;
