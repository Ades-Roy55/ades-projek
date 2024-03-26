import { WalletCards, CircleUser, Info, Home } from "lucide-react";
const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-red-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center justify-evenly">
          <div className="flex"><img
            src="/image/logo.jpg"
            alt="Logo"
            className="h-8 w-8 rounded-full mr-2"
          />
          <h1 className="text-white text-lg font-semibold mr-4">
            Ferrari Cars Catalog
          </h1>
          </div>
          <nav className="flex items-center ml-auto">
            <Home className="text-white mr-4" />
            <Info className="text-white mr-4" />
            <WalletCards className="text-white mr-4" />
            <CircleUser className="text-white" />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
