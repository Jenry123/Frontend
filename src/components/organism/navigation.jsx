import NavSection from "../molecules/article.section";
import { Link , Outlet } from "react-router-dom"; 

const Navigation = ({info , className}) => {
  

  return (
    <>
    <div className={className}>
      {info.map((item, index) => (
        <NavSection key={index} info={item} />
      ))}
    </div>

    <div className="main-content-navigation">
        <Outlet></Outlet>
    </div>
    </>
  );
};

export default Navigation;
