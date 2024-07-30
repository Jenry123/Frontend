import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import '../../styles/Inventory.scss';
import PiezasMaquinariaForm from "./PiezasMaquinariaForm";
import CostalesHarinaForm from "../molecules/CostalesHarinaForm";
import { left } from "@popperjs/core";





const AdminInventary = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };


    return (
        <div className="container-inventory">

            <div className="container-section">
                <div className="container-option">
                    <p>Seleccione una opción</p>

                    <select value={selectedOption} onChange={handleSelectChange}>
                        <option value="">Seleccione una opción</option>
                        <option value="piezas_maquinaria">Piezas de Maquinaria</option>
                        <option value="costales_harina">Costales de Harina</option>
                    </select>
                    <p>
                        <Link to='addedInventory'>Ver Inventario</Link>
                    </p>
                </div>
                <div>

                    {selectedOption === "piezas_maquinaria" && <PiezasMaquinariaForm></PiezasMaquinariaForm>}
                    {selectedOption === "costales_harina" && <CostalesHarinaForm></CostalesHarinaForm>}

                </div>

                <div className="">



                    <Outlet>

                    </Outlet>

                </div>
            </div>
        </div>
    );
};

export default AdminInventary;