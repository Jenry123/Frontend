import Navigation from "../../components/organism/navigation.jsx";


const AdminServices=()=>{
    const info = [
        { label: "Provedores", path: "agregar-servicio" },
        { label: "Servicios", path: "serviciosAdded" },      
        { label: "Registrar pagos", path: "registrar-pago" }
      ];
      
    return(
        <>
        <div className="main-container-users">
             <Navigation className={'content-box-section'} info={info} ></Navigation>
        </div>
           
        </>
    )
}

export default AdminServices;  