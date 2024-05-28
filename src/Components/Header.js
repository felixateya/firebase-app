import { useResolvedPath } from "react-router";
import { FaRegBell } from "react-icons/fa";

function Header({ user, profile }) {
  const params = useResolvedPath();

  return (
    <header className="header">
      <h4>
        {params.pathname  === '/' ? 'dashboard' : params.pathname.replace("/", "")}
      </h4>
      <div className="all">
        {/* <div className="search">
          <input type="search" placeholder="Search..." name="search" />
          <FaSearch />
        </div> */}
        
        <FaRegBell />
        <div className="profile">
          {!profile ? <p>...</p> : <img className="img" src={profile} alt='profile-pic'/>}
          <p>{user}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
