import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Oh, no! Page not found!</h3>
        <p>
          We can't find the page that you're looking for. Please check the URL
          and try again.
        </p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
