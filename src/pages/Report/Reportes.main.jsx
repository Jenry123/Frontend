import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './report.scss'
import Report_inventary from './ReportInventory';
import Report_Employes from './Report_employes';
import Report_servicios from './ReportServicios';
import Report_sales from './Report_sales';

const Report = () => {
    const [selectedReport, setSelectedReport] = useState(''); // Estado para la opción seleccionada

    const reportOptions = [
        { path: 'Inventorytrigger', label: 'Inventario' },
        { path: 'Employestrigger', label: 'Empleados' },
        { path: 'Servicetrigger', label: 'Servicios' },
        { path: 'Salestrigger', label: 'Ventas' },
       
    ];

    const renderReportContent = () => {
        switch (selectedReport) {
            case 'Inventorytrigger':
                return <Report_inventary></Report_inventary>;
            case 'Employestrigger':
                return <Report_Employes></Report_Employes>;
            case 'Servicetrigger':
                return <Report_servicios></Report_servicios>
            case 'Salestrigger':
                return <Report_sales></Report_sales>;
            default:
                return <div>Por favor, seleccione un reporte.</div>;
        }
    };

 
   
    return (
        <div className='report-container'>
            <p>Elija una de las siguientes opciones:</p>
            <div className="container-option-report">
                {reportOptions.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={`btn ${selectedReport === item.path ? 'btn-warning' : 'btn-outline-success'}`}
                        onClick={() => setSelectedReport(item.path)}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
            <div className="report-content">
                {renderReportContent()}
            </div>
        </div>
    );
};

export default Report;
