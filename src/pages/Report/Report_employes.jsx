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

const Report_Employes = () => {
    const [employeesData, setEmployeesData] = useState([]);

    useEffect(() => {
        // Para obtener datos de empleados
        const fetchEmployeesData = async () => {
            try {
                const response = await axios.get('/api/employees');
                console.log('Datos de empleados:', response.data); // Verifica los datos recibidos
                if (Array.isArray(response.data)) {
                    setEmployeesData(response.data);
                } else {
                    console.error('Los datos de empleados no son un arreglo:', response.data);
                }
            } catch (error) {
                console.error('Error al obtener datos de empleados:', error);
            }
        };

        fetchEmployeesData();
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
            if (Array.isArray(employeesData) && employeesData.length > 0) {
                doc.autoTable({
                    startY: 60,
                    head: [['Nombre', 'Apellido', 'Estado', 'Sexo', 'Email', 'Contraseña']],
                    body: employeesData.map(item => [
                        item.nombre,
                        item.apellido,
                        item.estado,
                        item.sexo,
                        item.email,
                        item.contraseña
                    ]),
                    theme: 'striped'
                });
            } else {
                doc.text('No hay datos disponibles para mostrar.', 10, 60);
            }

            // Guardar el PDF
            doc.save('empleados.pdf');
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
        if (Array.isArray(employeesData) && employeesData.length > 0) {
            doc.autoTable({
                startY: 20,
                head: [['Nombre', 'Apellido', 'Estado', 'Sexo', 'Email', 'Contraseña']],
                body: employeesData.map(item => [
                    item.nombre,
                    item.apellido,
                    item.estado,
                    item.sexo,
                    item.email,
                    item.contraseña
                ]),
                theme: 'striped'
            });
        } else {
            doc.text('No hay datos disponibles para mostrar.', 10, 20);
        }

        // Guardar el PDF
        doc.save('empleados.pdf');
    };

    return (
        <>
            <div className='main-container-users'>
                <button onClick={generatePDF}>Generar Reporte de Empleados</button>
                {/* Puedes agregar aquí el componente AdminDataInventory si es necesario */}
            </div>
        </>
    );
};

export default Report_Employes;
