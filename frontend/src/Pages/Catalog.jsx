import { useEffect, useState } from "react";
import { api } from "../utils";
import { Heart, Info, Search, Trash } from "lucide-react"; 

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    api.get("/car/get-all").then((res) => {
      setCars(res);
      setSearchResults(res);
    });
  }, []);

  const openPopup = (car) => {
    setSelectedCar(car);
  };

  const closePopup = () => {
    setSelectedCar(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredCars = cars.filter(
      (car) =>
        car.merk.toLowerCase().includes(e.target.value.toLowerCase()) ||
        car.tahun_rilis.toString().includes(e.target.value)
    );
    setSearchResults(filteredCars);
  };

  const handleFavorite = (car) => {
    // Jika mobil sudah difavoritkan, hapus dari daftar favorit
    if (isFavorite(car)) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== car.id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Jika mobil belum difavoritkan, tambahkan ke daftar favorit
      const updatedFavorites = [...favorites, car];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const isFavorite = (car) => {
    return favorites.some((fav) => fav.id === car.id);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="col-span-3 flex items-center justify-between">
          <div className="relative flex items-center w-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by brand or release year"
                value={searchTerm}
                onChange={handleSearch}
                className="border rounded-l p-2 w-full"
              />
              <div className="absolute inset-y-0 right-10 flex items-center px-2 bg-gray-200 rounded-r">
                <Search />
              </div>
            </div>
            <button className="absolute right-0" onClick={() => setShowFavorites(true)}>
              <Heart size={24} fill={favorites.length > 0 ? "red" : "black"} />
            </button>
          </div>
        </div>
        {searchResults.map((c) => (
          <div key={c.id} className="border rounded-lg p-2 flex flex-col items-center relative">
            <img src={c.image} alt="" className="w-56 h-40 object-cover mb-2 overflow-hidden rounded-md transform hover:scale-105 transition duration-300 ease-in-out"/>
            <h1 className="text-center">{c.merk}</h1>
            <h1 className="text-center">{c.tahun_rilis}</h1>
            <div className="flex justify-around mt-2 w-full">
              <button onClick={() => openPopup(c)}>
                <Info />
              </button>
              <button onClick={() => handleFavorite(c)}>
                <Heart fill={isFavorite(c) ? "red" : "black"} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <img src={selectedCar.image} alt="" className="w-64 h-48 object-cover overflow-hidden rounded-md" />
            </div>
            <h1 className="text-center">{selectedCar.merk}</h1>
            <h1 className="text-center">Tahun Rilis {selectedCar.tahun_rilis}</h1>
            <p className="text-center">{selectedCar.description}</p>
            <button className="mt-4 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

{showFavorites && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white rounded-lg w-96 relative">
      <button className="absolute top-0 right-0 m-4" onClick={() => setShowFavorites(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h1 className="text-center text-xl font-semibold mb-4">Favorite Cars</h1>
      <ul className="divide-y divide-gray-300 overflow-auto" style={{ maxHeight: `${favorites.length * 48}px` }}>
        {favorites.map((car) => (
          <li key={car.id} className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <img src={car.image} alt="" className="w-12 h-8 object-cover mr-2" />
              <div>
                <p>{car.merk}</p>
                <p>{car.tahun_rilis}</p>
              </div>
            </div>
            <button onClick={() => handleFavorite(car)}>
              <Trash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

    </div>
  );
};

export default Catalog;
