import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const Main = () => {
  return (
    <div>
      <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet></Outlet>
      </Suspense>
      <Footer/>
    </div>
  );
};

export default Main;
