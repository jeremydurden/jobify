import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";

const Landing = () => {
  return (
    <main>
      <nav>
        <img src={logo} alt="jobify" className="logo" />
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
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </main>
  );
};
export default Landing;
