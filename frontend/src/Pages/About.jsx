// import React from "react";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="/image/bg.jpg" alt="bg" className="object-cover w-full h-full" />
      </div>
      <div className="z-10 relative text-center text-black">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text mb-4 max-w-md mx-auto px-4 lg:max-w-xl">
          Welcome to Catalog Ferrari: Explore the Beauty and Power
        </h2>
        <div className="bg-gray-100 bg-opacity-50 p-8 rounded-xl max-w-lg mx-auto">
          <div className="italic text-gray-900">
          <p>
            Di sini, Anda akan menemukan gambaran menyeluruh tentang warisan dan inovasi Ferrari, mulai dari mobil balap legendaris hingga supercar modern yang revolusioner. Setiap model kami dirancang dengan keahlian yang tak tertandingi dan ditenagai oleh teknologi canggih yang menghasilkan performa tanpa kompromi.
          </p>
          <p>
            Lewati pintu gerbang dunia Ferrari dan biarkan diri Anda terpesona oleh keindahan desain, kekuatan mesin, dan semangat balap yang melekat pada setiap kendaraan. Jelajahi katalog kami, rasakan kecepatan dalam setiap gambar, dan temukan cerita di balik setiap mobil yang membentuk sejarah legendaris Ferrari.
          </p>
          <p>
            Bergabunglah dengan kami dalam perjalanan mengagumkan ini melalui dunia Ferrari, di mana impian menjadi kenyataan dan kecepatan menjadi gaya hidup.
          </p>
          <p>
            Selamat menikmati!
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
