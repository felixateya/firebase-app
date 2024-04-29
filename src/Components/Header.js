import { useResolvedPath } from "react-router";
import { FaRegBell, FaCog } from "react-icons/fa";

function Header({ user }) {
  const params = useResolvedPath();

  return (
    <header className="header">
      <h4>
        Fiscall | <span>{params.pathname  === '/' ? 'dashboard' : params.pathname.replace("/", "")}</span>
      </h4>
      <div className="all">
        {/* <div className="search">
          <input type="search" placeholder="Search..." name="serach" />
          <FaSearch />
        </div> */}
        <FaCog/>
        <FaRegBell />
        <div className="profile">
          <h5 className="img"> </h5>
          <p>{user || "test user"}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
