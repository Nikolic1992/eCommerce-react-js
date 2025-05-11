// ICONS
import { CiLocationOn, CiDeliveryTruck } from "react-icons/ci";
import { RiCloseFill } from "react-icons/ri";

function HeaderComponent({ setActiveHeader }) {
  return (
    <div className="flex items-center justify-between container mx-auto h-[80px] flex-col lg:flex-row py-[20px]">
      {/* Phone number with click-to-call */}
      <p className="flex gap-[10px]">
        Need help? Call us:
        <a
          href="tel:+980234456789"
          className="text-blue-700 hover:text-white hover:bg-blue-500"
        >
          (+98) 0234 456 789
        </a>
      </p>

      {/* Right side */}
      <div className="flex items-center gap-[20px]">
        <div className="flex items-center gap-[10px]">
          <CiLocationOn size={24} />
          <span>Our Store</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <CiDeliveryTruck size={24} />
          <span>Track your order</span>
        </div>
        <RiCloseFill
          className="lg:absolute lg:mt-[-50px] lg:ml-[248px] lg:mb-[10px] hover:bg-black hover:text-white hover:cursor-pointer"
          size={24}
          onClick={() => setActiveHeader(false)}
        />
      </div>
    </div>
  );
}

export default HeaderComponent;
