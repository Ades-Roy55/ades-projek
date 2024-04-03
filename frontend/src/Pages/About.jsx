const About = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen relative">
            <div className="absolute inset-0 z-0">
                <img src="/image/bg.jpg" alt="bg" className="object-cover w-full h-full" />
            </div>
            <div className="z-10 relative">
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-red-500 to-white bg-clip-text mb-4">Welcome to Catalog Ferrari: Explore the Beauty and Power</h2>
                <div className="text-center bg-gray-100 bg-opacity-50 p-8 rounded-xl max-w-lg">
                    <p className="italic text-gray-900">
                    Welcome to Catalog Ferrari, where you can experience the beauty and power of legendary cars from Maranello. We invite you to immerse yourself in this captivating digital experience, where you will explore the most iconic sports and supercars in the world.
                    </p>
                    
                </div>
            </div>
        </div>
    )
}

export default About;
