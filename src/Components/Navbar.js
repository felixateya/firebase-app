import React, { useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { SiWebmoney, SiDwavesystems } from "react-icons/si";
import { GiExpense } from "react-icons/gi";
import {
  HiArrowRightOnRectangle,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi2";
import { NavLink, Link } from "react-router-dom";
import { FaCog, FaPowerOff } from "react-icons/fa";
function Navbar({ signOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen((is) => !is);
  return (
    <div className={`navbar ${isOpen ? "open" : ""}`}>
      {!isOpen ? (
        <HiChevronRight onClick={handleIsOpen} className="extend" />
      ) : (
        <HiChevronLeft onClick={handleIsOpen} className="extend" />
      )}
      <Link to="/" className="logo">
        <h5>
          <SiDwavesystems />
        </h5>
        <h5 className={`${isOpen ? "flex" : "link"}`}>Fiscall LLC</h5>
      </Link>

      <div className="links">
        <NavLink to="/">
          <h5>
            <RiDashboardFill />
          </h5>
          <h5 className={`${isOpen ? "flex" : "link"}`}>Dashboard</h5>
        </NavLink>
        <NavLink to="/income">
          <h5>
            <SiWebmoney />
          </h5>
          <h5 className={`${isOpen ? "flex" : "link"}`}>Income</h5>
        </NavLink>
        <NavLink to="/expenses">
          <h5>
            <GiExpense />
          </h5>
          <h5 className={`${isOpen ? "flex" : "link"}`}>Expenses</h5>
        </NavLink>
        <NavLink to="/profile">
          <h5>
            <CgProfile />
          </h5>
          <h5 className={`${isOpen ? "flex" : "link"}`}>Profile</h5>
        </NavLink>
        <NavLink to="/settings">
          <h5>
          <FaCog/>
          </h5>
          <h5 className={`${isOpen ? "flex" : "link"}`}>Settings</h5>
        </NavLink>
      </div>

      <button className="logout" onClick={signOut}>
        <h5>
          <FaPowerOff />
        </h5>
        <h5 className={`${isOpen ? "flex" : "link"}`}>Log out</h5>
      </button>
    </div>
  );
}

export default Navbar;
