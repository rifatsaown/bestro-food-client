import { BiMenuAltRight } from "react-icons/bi";
import {
  FaBook,
  FaCalendarAlt,
  FaHome,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
  const { cart } = useCart();

  const { isAdmin } = useAdmin();

  // const isAdmin = true;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden my-4"
        >
          Open Side Bar
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 ">
          {/* Sidebar content here */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItem">
                  <FaUtensils /> Add Item
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItem">
                  <FaWallet /> Manage Item
                </NavLink>
                <NavLink to="/dashboard/history">
                  <FaBook /> Manage Bookings
                </NavLink>
                <NavLink to="/dashboard/allusers">
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/resarvation">
                  <FaCalendarAlt /> Resarvation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">
                  <FaWallet /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mycart">
                  <FaShoppingCart /> My Cart
                  <span className="badge badge-sm indicator-item">
                    {cart.length || 0}
                  </span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider" />
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <BiMenuAltRight /> Our Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <IoBagCheckOutline /> Order
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
