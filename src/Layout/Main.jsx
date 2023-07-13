import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
  const location = useLocation();
  const notShowHeaderFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  return (
    <div>
      {!notShowHeaderFooter && <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet></Outlet>
      </Suspense>
      {!notShowHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;
