import { Link, NavLink } from "react-router-dom";
import '../../styles/li.scss'

const LI = ({ path, label }) => {
  return (
    <li className="list-title">
      <NavLink to={path}  className={({ isActive }) => 
          isActive ? "ref-info active" : "ref-info inactive"
        }>{label}</NavLink>
    </li>
  );
};

export default LI;
