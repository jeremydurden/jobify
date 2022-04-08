import { useAppContext } from "../context/appContext";
import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/SmallSidebar";

export const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={() => console.log("toggle")}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">nav links</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
