import React from "react";

function Table({ children }) {
  return <div className="table">{children}</div>;
}

function Header({ children }) {
  return <header className="header-table">{children}</header>;
}

function Row({ children }) {
  return <div className="row">{children}</div>;
}

// function Body({ data, render }) {
//   if (!data.length) return <p className="empty">No data to show at the moment</p>;
// //   return <div className="body">{data.map(render)}</div>;
//   return <p className="empty">No data to show at the moment</p>;
// }
function Body({ children }) {
  return <div className="body">{children}</div>;
}

function Footer({ children }) {
  return <footer className="footer">{children}</footer>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
