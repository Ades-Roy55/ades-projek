import { useEffect, useState } from "react";
import { api } from "../utils";
import { Heart, Info } from "lucide-react";

const Catalog = () => {
  const [cars, setCars] = useState();
  useEffect(() => {
    api.get("/car/get-all").then((res) => setCars(res));
  }, []);

  console.log(cars);
  return (
    <div>
      {/* <img
        src="/image/bg.jpg"
        alt="bg"
        className="object-cover w-full h-full"
      /> */}
      <div className="grid grid-cols-2 gap-2 py-4">
        {cars &&
          cars.map((c) => (
            <div key={c.id}>
              <img src={c.image} alt="" />
              <h1>{c.merk}</h1>
              <h1>{c.tahun_rilis}</h1>
              <div className="flex justify-around">
                <Heart />
                <Info />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Catalog;
