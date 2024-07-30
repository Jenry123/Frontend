import { Outlet} from "react-router-dom";
import Header from "../../components/molecules/Header";
import Menu from "../../components/organism/HorizontalSlides";
import { useState } from "react";
import WelcomeModal from "./Bienvenida";

const UserDashboard=()=>{
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);

    const handleCloseWelcomeModal = () => setShowWelcomeModal(false);
    
    const buttons=[
        {label:'Inventario' , path:'viewUserinventario'},
        {label:'Ventas' , path:'Ventas'},
        {label:'Caja' ,path:'Caja'}
    ]
    
    return(
        <>
        <Header>
            <Menu buttons={buttons}></Menu>
       </Header>

       <WelcomeModal show={showWelcomeModal} handleClose={handleCloseWelcomeModal} />
       <div className="main-content">
          <Outlet></Outlet>
       </div>
       </>
    )
}

export default UserDashboard;