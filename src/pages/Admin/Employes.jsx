
import Navigation from "../../components/organism/navigation";


const AdminEmployes = ()=>{
    const info=[
        {label:'Agregar' , path:"employesAdd"},
        {label:'Ver Empleado' , path:"employesAdded"},
        {label:'Dias laborados' , path:"daysAdd"}
     ]

    return(
        <>
             <Navigation info={info} className={'content-box-section'}></Navigation>
        </>
       
    )
}

export default AdminEmployes;