import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import logoUrl from '../../assets/logo.jpg'; // Ajusta la ruta según tu estructura

// Para obtener la fecha actual
const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

const Report_sales = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        // Para obtener datos de ventas
        const fetchSalesData = async () => {
            try {
                const response = await axios.get('/api/sales');
                console.log('Datos de ventas:', response.data); // Verifica los datos recibidos
                if (Array.isArray(response.data)) {
                    setSalesData(response.data);
                } else {
                    console.error('Los datos de ventas no son un arreglo:', response.data);
                }
            } catch (error) {
                console.error('Error al obtener datos de ventas:', error);
            }
        };

        fetchSalesData();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();

        // Añadir el logo al PDF
        const logoImg = new Image();
        logoImg.src = logoUrl;
        logoImg.onload = () => {
            doc.addImage(logoImg, 'PNG', 10, 10, 50, 30); // Ajusta la posición y tamaño del logo

            // Agregar la fecha actual
            const currentDate = getCurrentDate();
            doc.setFontSize(12);
            doc.text(`Fecha: ${currentDate}`, 10, 50); // Ajusta la posición del texto

            // Agregar tabla con datos
            if (Array.isArray(salesData) && salesData.length > 0) {
                doc.autoTable({
                    startY: 60,
                    head: [['ID', 'Nombre', 'Cantidad', 'Precio', 'Fecha', 'Ubicación']],
                    body: salesData.map(item => [
                        item.id,
                        item.nombre,
                        item.cantidad,
                        item.precio,
                        item.fecha,
                        item.ubicacion
                    ]),
                    theme: 'striped'
                });
            } else {
                doc.text('No hay datos disponibles para mostrar.', 10, 60);
            }

            // Guardar el PDF
            doc.save('ventas.pdf');
        };

        logoImg.onerror = () => {
            console.error('Error al cargar la imagen del logo');
            // Genera el PDF sin logo si es necesario
            generatePDFWithoutLogo();
        };
    };

    const generatePDFWithoutLogo = () => {
        const doc = new jsPDF();
        // Agregar la fecha actual
        const currentDate = getCurrentDate();
        doc.setFontSize(12);
        doc.text(`Fecha: ${currentDate}`, 10, 10); // Ajusta la posición del texto

        // Agregar tabla con datos
        if (Array.isArray(salesData) && salesData.length > 0) {
            doc.autoTable({
                startY: 20,
                head: [['ID', 'Nombre', 'Cantidad', 'Precio', 'Fecha', 'Ubicación']],
                body: salesData.map(item => [
                    item.id,
                    item.nombre,
                    item.cantidad,
                    item.precio,
                    item.fecha,
                    item.ubicacion
                ]),
                theme: 'striped'
            });
        } else {
            doc.text('No hay datos disponibles para mostrar.', 10, 20);
        }

        // Guardar el PDF
        doc.save('ventas.pdf');
    };

    return (
        <>
            <div className='main-container-sales'>
                <button onClick={generatePDF}>Generar Reporte de Ventas</button>
                {/* Puedes agregar aquí el componente adicional si es necesario */}
            </div>
        </>
    );
};

export default Report_sales;
