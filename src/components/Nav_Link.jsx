import { Link } from "react-router-dom";

function Nav_Link({ to, children }) {
  return <Link to={to}>{children}</Link>;
}

export default Nav_Link;
