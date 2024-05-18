import React from "react";
import { NavLink } from "react-router-dom";

export const MyLink = ({ children, to }) => {

  return <NavLink to={`/${to === "dashboard" ? "" : to}`}>{children}</NavLink>;
};
