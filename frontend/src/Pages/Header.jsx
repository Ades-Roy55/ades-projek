import { useState } from "react";
import { WalletCards, CircleUser, Info, Home, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="sticky top-0 left-0 w-full bg-red-700 shadow-lg z-50">
      <div
        id="header"
        className="w-full mx-auto px-4 py-3 flex items-center justify-between"
      >
        <div className="flex justify-between items-center">
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
          <nav className="lg:flex lg:gap-10 hidden right-0 lg:block">
            <NavLink
              to="/"
              className="text-white flex items-center mr-4"
              activeClassName="font-bold"
            >
              <Home className="mr-1 inline-block" />
              <span className="inline-block">Home</span>
            </NavLink>
            <NavLink
              to="/about"
              className="text-white flex items-center mr-4"
              activeClassName="font-bold"
            >
              <Info className="mr-1 inline-block" />
              <span className="inline-block">About</span>
            </NavLink>
            <NavLink
              to="/catalog"
              className="text-white flex items-center mr-4"
              activeClassName="font-bold"
            >
              <WalletCards className="mr-1 inline-block" />
              <span className="inline-block">Catalog</span>
            </NavLink>
            <NavLink
              to="/profile"
              className="text-white flex items-center"
              activeClassName="font-bold"
            >
              <CircleUser className="mr-1 inline-block" />
              <span className="inline-block">Profile</span>
            </NavLink>
          </nav>
        </div>
        <div className="lg:hidden">
          <Menu className="text-white text-2xl" onClick={toggleMenu} />
          {menuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-red-700 rounded-lg shadow-lg">
              <nav className="flex flex-col p-4 gap-8">
                <NavLink
                  to="/"
                  className="text-white flex items-center"
                  activeClassName="font-bold"
                >
                  <Home className="mr-1 inline-block" />
                  <span className="inline-block">Home</span>
                </NavLink>
                <NavLink
                  to="/about"
                  className="text-white flex items-center"
                  activeClassName="font-bold"
                >
                  <Info className="mr-1 inline-block" />
                  <span className="inline-block">About</span>
                </NavLink>
                <NavLink
                  to="/catalog"
                  className="text-white flex items-center"
                  activeClassName="font-bold"
                >
                  <WalletCards className="mr-1 inline-block" />
                  <span className="inline-block">Catalog</span>
                </NavLink>
                <NavLink
                  to="/profile"
                  className="text-white flex items-center"
                  activeClassName="font-bold"
                >
                  <CircleUser className="mr-1 inline-block" />
                  <span className="inline-block">Profile</span>
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-white flex items-center"
                  activeClassName="font-bold"
                >
                  <LogOut className="mr-1 inline-block" />
                  <span className="inline-block">LogOut</span>
                </NavLink>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
