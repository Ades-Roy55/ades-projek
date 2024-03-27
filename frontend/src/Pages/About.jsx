const About = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen relative">
            <div className="absolute inset-0 z-0">
                <img src="/image/bg.jpg" alt="bg" className="object-cover w-full h-full" />
            </div>
            <div className="z-10 relative">
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-red-500 to-white bg-clip-text mb-4">About Ferrari</h2>
                <div className="text-center bg-gray-100 bg-opacity-50 p-8 rounded-xl max-w-lg">
                    <p className="italic text-gray-900">
                        Ferrari adalah salah satu merek mobil sport dan supercar paling ikonik di dunia, dikenal karena desainnya yang elegan, kinerja yang luar biasa, dan warisan balapnya yang kaya. Ferrari Cars Catalog adalah sumber informasi yang kaya tentang berbagai model mobil Ferrari yang telah diproduksi dari masa ke masa.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;
