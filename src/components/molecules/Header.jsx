import Button from "../atoms/button";
import '../../styles/Header.scss';
import logo from '../../assets/logo.jpg'

const Header = ({children}) => {
    return (
        <>
            <div className="header">   
                <div className="logo"> <p className="header-title">Tortilleria Eveneser</p></div>        
                <div className="navbar-brand">
                    {children}
                </div>

                <div className="button-container-sing-up">
                    <Button clase={'clase-prueba'}>Cerrar Sesión</Button>
                </div>
                
            
            </div>
         
        </>

    )
    
}

export default Header;