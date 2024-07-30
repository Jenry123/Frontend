import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

// Función para obtener la fecha actual
const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

const Report_servicios = () => {
    const [servicesData, setServicesData] = useState([]);

    useEffect(() => {
        // Obtener datos de los servicios
        const fetchServicesData = async () => {
            try {
                const response = await axios.get('/api/servicios');
                setServicesData(response.data);
            } catch (error) {
                console.error('Error al obtener datos de los servicios:', error);
            }
        };

        fetchServicesData();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();

        // Añadir el logo al PDF (asegúrate de que la ruta sea correcta)
        const logoUrl = '../../assets/logo.jpg'; // Cambia esto a la ruta de tu logo
        const logoImg = new Image();
        logoImg.src = logoUrl;
        logoImg.onload = () => {
            doc.addImage(logoImg, 'PNG', 10, 10, 50, 30); // Ajusta la posición y tamaño del logo

            // Agregar la fecha actual
            const currentDate = getCurrentDate();
            doc.setFontSize(12);
            doc.text(`Fecha: ${currentDate}`, 10, 50); // Ajusta la posición del texto

            // Agregar tabla con datos de servicios
            doc.autoTable({
                startY: 60,
                head: [['Nombre', 'Proveedor', 'Contacto']],
                body: servicesData.map(item => [
                    item.nombre,
                    item.proveedor,
                    item.contacto
                ]),
                theme: 'striped'
            });

            // Guardar el PDF
            doc.save('servicios.pdf');
        };
        logoImg.onerror = () => {
            doc.setFontSize(12);
            doc.text('Error al cargar el logo.', 10, 10);
            doc.autoTable({
                startY: 20,
                head: [['Nombre', 'Proveedor', 'Contacto']],
                body: servicesData.map(item => [
                    item.nombre,
                    item.proveedor,
                    item.contacto
                ]),
                theme: 'striped'
            });
            doc.save('servicios.pdf');
        };
    };

    return (
        <div className='main-container-services'>
            <button onClick={generatePDF}>Generar Reporte de Servicios</button>
        </div>
    );
};

export default Report_servicios;
