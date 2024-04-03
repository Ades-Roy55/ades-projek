const Footer = () => {
  return (
    <div className="w-full bg-red-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>Email: example@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Address</h3>
          <p>123 Street Name</p>
          <p>City, State, Country</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 8.343a4 4 0 10-5.657-5.657 4 4 0 005.657 5.657z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19v-6a1 1 0 00-1-1H6"
                />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v4"
                />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 3.055a4.998 4.998 0 00-7.858-.959M5.429 10.386A9.888 9.888 0 001 13c0 4.97 3.803 9 8.5 9s8.5-4.03 8.5-9c0-.67-.067-1.323-.196-1.955M16 3.055c1.156-.618 2.462-.96 3.75-.96C20.53 2.095 21 2.566 21 3.25c0 .322-.035.635-.1.935M16 3.055c-.426-.865-1.328-1.409-2.35-1.409-1.497 0-2.5 1.232-2.5 2.664 0 .53.155 1.022.436 1.464M10.45 18c-.656.33-1.336.5-2.05.5-.714 0-1.394-.17-2.05-.5"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; 2024 AdesProjek. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
