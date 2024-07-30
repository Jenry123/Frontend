import Navigation from "../../components/organism/navigation";
import '../../styles/usuarios.scss'

const AdminUsers=()=>{
    const info = [
        
        { label: "Agregar Usuario", path: "agregar-usuario" },
        { label: "Usuarios", path: "usersAdded" }
      ];
    return(
        <div className="main-container-users">
             <Navigation info={info} className={'content-box-section'}></Navigation>
        </div>
       
    )
}

export default AdminUsers;