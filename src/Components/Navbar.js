import React, { useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { SiWebmoney} from "react-icons/si";
import { GiExpense } from "react-icons/gi";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaCog, FaPowerOff } from "react-icons/fa";
import logo from '../assets/logo.svg';
import { MyLink } from "./MyLink";
function Navbar({ signOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen((is) => !is);
  const linkTexts = [
    { text: "dashboard", icon: <RiDashboardFill /> },
    { text: "income", icon: <SiWebmoney /> },
    { text: "expenses", icon: <GiExpense /> },
    { text: "profile", icon: <CgProfile /> },
    { text: "settings", icon: <FaCog /> },
  ];
  return (
    <div className={`navbar ${isOpen ? "open" : ""}`}>
      {!isOpen ? (
        <HiChevronRight onClick={handleIsOpen} className="extend" />
      ) : (
        <HiChevronLeft onClick={handleIsOpen} className="extend" />
      )}
      <Link to="/" className="logo">
        <img src={logo} alt=""/>
        <h5 className={`${isOpen ? "flex" : "link"}`}>Fiscall LLC</h5>
      </Link>

      <div className="links">
        {linkTexts.map((myLInk) => (
          <div key={Math.random()*2}>
            <MyLink to={myLInk.text}>
              <h5>{myLInk.icon}</h5>
              <h5 className={isOpen ? "flex" : "link"}>{myLInk.text}</h5>
            </MyLink>
          </div>
        ))}
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
