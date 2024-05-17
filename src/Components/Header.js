import { useResolvedPath } from "react-router";
import { FaRegBell } from "react-icons/fa";

function Header({ user }) {
  const params = useResolvedPath();

  return (
    <header className="header">
      <h4>
        {params.pathname  === '/' ? 'Dashboard' : params.pathname.replace("/", "")}
      </h4>
      <div className="all">
        {/* <div className="search">
          <input type="search" placeholder="Search..." name="serach" />
          <FaSearch />
        </div> */}
        
        <FaRegBell />
        <div className="profile">
          <h5 className="img"> </h5>
          <p>{user}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
