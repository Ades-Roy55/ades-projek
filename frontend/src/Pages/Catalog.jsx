import { useEffect, useState } from "react";
import { api } from "../utils";
import { Heart, Info, Search } from "lucide-react"; 

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
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

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 py-4">
        <div className="col-span-3 flex items-center justify-between">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by brand or release year"
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded-l p-2 w-full"
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-2 bg-gray-200 rounded-r">
              <Search />
            </div>
          </div>
        </div>
        {searchResults.map((c) => (
          <div key={c.id} className="border rounded-lg p-2 flex flex-col items-center">
            <img src={c.image} alt="" className="w-56 h-40 object-cover mb-2 overflow-hidden rounded-md" />
            <h1 className="text-center">{c.merk}</h1>
            <h1 className="text-center">{c.tahun_rilis}</h1>
            <div className="flex justify-around mt-2 w-full">
              <Heart />
              <button onClick={() => openPopup(c)}>
                <Info />
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
            <h1 className="text-center">{selectedCar.tahun_rilis}</h1>
            <p className="text-center">{selectedCar.description}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
