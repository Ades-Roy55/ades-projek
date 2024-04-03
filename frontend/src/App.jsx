import Header from "./Pages/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Pages/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default App;
