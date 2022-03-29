import { Logo } from "../components/index";
import { Link } from "react-router-dom";

import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            perferendis nulla reprehenderit eligendi laudantium! Expedita
            placeat nihil explicabo! Non numquam sapiente aspernatur itaque! Aut
            voluptate impedit dolore deserunt nulla! Magnam.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
