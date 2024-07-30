import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import logoUrl from '../../assets/logo.jpg'; // Ajusta la ruta según tu estructura
import AdminDataInventory from '../../components/organism/Admin.Inventory';
import './report.scss'


// Para obtener la fecha actual
const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

const Report_inventary = () => {
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        //datos de inventario para optener
        const fetchInventoryData = async () => {
            try {
                const response = await axios.get('/api/inventario');
                console.log('Datos del inventario:', response.data); // Verifica los datos recibidos
                if (Array.isArray(response.data)) {
                    setInventoryData(response.data);
                } else {
                    console.error('Los datos del inventario no son un arreglo:', response.data);
                }
            } catch (error) {
                console.error('Error al obtener datos del inventario:', error);
            }
        };

        fetchInventoryData();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();

       //logo
        const logoImg = new Image();
        logoImg.src = logoUrl;
        logoImg.onload = () => {
            doc.addImage(logoImg, 'PNG', 10, 10, 50, 30); 

            // fecha actual agregar
            const currentDate = getCurrentDate();
            doc.setFontSize(12);
            doc.text(`Fecha: ${currentDate}`, 10, 50); // Ajusta la posición del texto

            // Agregar tabla con datos // aqui ajustar los datos del inventario con la base de datos
            if (Array.isArray(inventoryData) && inventoryData.length > 0) {
                doc.autoTable({
                    startY: 60,
                    head: [['ID', 'Nombre', 'Cantidad', 'Precio', 'Ubicación']],
                    body: inventoryData.map(item => [
                        item.id,
                        item.nombre,
                        item.cantidad,
                        item.precio,
                        item.ubicacion
                    ]),
                    theme: 'striped'
                });
            } else {
                doc.text('No hay datos disponibles para mostrar.', 10, 60);
            }

            // Guardar el PDF
            doc.save('inventario.pdf');
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
        if (Array.isArray(inventoryData) && inventoryData.length > 0) {
            doc.autoTable({
                startY: 20,
                head: [['ID', 'Nombre', 'Cantidad', 'Precio', 'Ubicación']],
                body: inventoryData.map(item => [
                    item.id,
                    item.nombre,
                    item.cantidad,
                    item.precio,
                    item.ubicacion
                ]),
                theme: 'striped'
            });
        } else {
            doc.text('No hay datos disponibles para mostrar.', 10, 20);
        }

        // Guardar el PDF
        doc.save('inventario.pdf');
    };

    const getContainerStyle = () => ({
        width: '100%',
         
       
    });

    return (
        <>
            <div >
            
                <button onClick={generatePDF}>Generar Reporte de Inventario</button>
                
            </div> 

            
               
             
        </>
    );
};

export default Report_inventary;
