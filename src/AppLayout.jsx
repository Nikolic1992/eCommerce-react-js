import { useState } from "react";
import { Outlet } from "react-router-dom";

// COMPONENTS
import HeaderComponent from "./components/HeaderComponent";
import NavBarComponent from "./components/NavBarComponent";
import CategoryComponent from "./components/CategoryComponent";

// AXIOS
import axios from "axios";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1";

function AppLayout() {
  const [activeHeader, setActiveHeader] = useState(true);
  return (
    <div>
      {activeHeader && <HeaderComponent setActiveHeader={setActiveHeader} />}
      <NavBarComponent />
      <CategoryComponent />
      <Outlet />
    </div>
  );
}

export default AppLayout;
