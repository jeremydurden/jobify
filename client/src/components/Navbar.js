import { useState } from "react";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";

import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const toggleShowLogout = () => {
    setShowLogout(!showLogout);
  };

  const { user, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button type="button" className="btn" onClick={toggleShowLogout}>
            <FaUserCircle />
            {user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              onClick={() => console.log("logout user")}
              className="dropdown-btn"
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
