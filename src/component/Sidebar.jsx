import React from "react";
import { useNavigation } from "../context/NavigationProvider";
import { navlist } from "../utils";
import { AiOutlineMenuFold } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useNavigation();
const {logOut} = useAuth()
  const NavList = () => (
    <ul className="list-unstyled m-0 ">
      {navlist.map(({ id, path, name }) => {
        return (
          <NavLink
            to={path}
            key={id}
            className="p-2 my-1 cursor-pointer nav-item"
          >
            <span className="font-medium">{name}</span>
          </NavLink>
        );
      })}
      <button className="w-full transparent flex text-red nav-item" onClick={logOut}>Logout</button>
    </ul>
  );
  return (
    <>
      {showSidebar && (
        <div className="flex justify-between mobile-navbar">
          <nav className="sidebar">
            <NavList />
          </nav>
          <button
            className="btn-menu"
            onClick={() => setShowSidebar((v) => !v)}
          >
            <AiOutlineMenuFold size={30} />
          </button>
        </div>
      )}
      <nav className="side-bar">
        <NavList />
      </nav>
    </>
  );
};

export default Sidebar;
