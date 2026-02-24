import { Link } from "react-router-dom";
import Nav_Link from "./Nav_Link";

function Nav() {
  return (
    <>
      <Nav_Link to="/">Home </Nav_Link>
      <Nav_Link to="/topics">Topics</Nav_Link>
    </>
  );
}

export default Nav;
