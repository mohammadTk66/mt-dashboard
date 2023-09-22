import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/store"}>Store</NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li>
          <NavLink to={"/team"}>Team</NavLink>
        </li>
        <li>
          <NavLink to={"/team/new"}>New Member</NavLink>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
