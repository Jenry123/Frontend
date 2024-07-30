import LI from "../atoms/li";

const NavSection = ({ info }) => {
  return (
    <div className="container-route">
        <nav>
            <ul>
                <LI path={info.path} label={info.label} />
            </ul>
      </nav>
    </div>
    
  );
};

export default NavSection;
