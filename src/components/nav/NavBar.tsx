import { Link } from "react-router-dom";
import NavAccount from "./NavAccount";

function NavBar() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          Critter Watch
        </Link>
        <NavAccount />
      </div>
    </nav>
  );
}

export default NavBar;
