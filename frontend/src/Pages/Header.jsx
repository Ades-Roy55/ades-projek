import { WalletCards, CircleUser, Info, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-red-700 shadow-lg z-50">
      <div id="header" className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <img
              src="/image/logo.jpg"
              alt="Logo"
              className="h-8 w-8 rounded-full mr-2"
            />
            <h1 className="text-white text-lg font-semibold mr-4">
              Ferrari Cars Catalog
            </h1>
          </div>
          <nav className="block lg:flex lg:gap-10">
          <NavLink to="/home">  <Home className="text-white mr-4" /> </NavLink>
          <NavLink to="/about">  <Info className="text-white mr-4" /></NavLink>
            <WalletCards className="text-white mr-4" />
            <CircleUser className="text-white" />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
