import React, { useState } from 'react';
import clienteAxios from '../../config/axios';

const Reporte = () => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [resultados, setResultados] = useState({});

    const fetchData = async () => {
        try {
            if (fechaInicio && fechaFin) {
                const response = await clienteAxios.get(`/reporte/tareas-atrasadas/${fechaInicio}/${fechaFin}`);
                setResultados(response.data);
            }
        } catch (error) {
            console.error('Error fetching report data', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div>
            <h2>Reporte de Tareas Atrasadas</h2>

            <form onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Fecha Inicio:</label>
                    <input
                        type="date"
                        name="fechaInicio"
                        onChange={e => setFechaInicio(e.target.value)}
                        value={fechaInicio}
                    />
                </div>

                <div className="campo">
                    <label>Fecha Fin:</label>
                    <input
                        type="date"
                        name="fechaFin"
                        onChange={e => setFechaFin(e.target.value)}
                        value={fechaFin}
                    />
                </div>

                <button type="submit" disabled={!fechaInicio || !fechaFin}>
                    Generar Reporte
                </button>
            </form>

            {resultados.totalAtrasadas !== undefined && (
                <div>
                    <h3>Total de Tareas Atrasadas: {resultados.totalAtrasadas}</h3>
                    <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tarea</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Empleado</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Proyecto</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Fecha Inicio</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Fecha Estimada Finalización</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Días Programados</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Días Atrasados</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultados.tareasAtrasadas.map((tarea, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tarea.descripcion}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tarea.Id_Empleado.nombre} {tarea.Id_Empleado.apellido}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tarea.Id_Proyecto.nombre}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(tarea.fechaInicio).toLocaleDateString()}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(tarea.fechaEstimadaFinalizacion).toLocaleDateString()}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tarea.tiempEstimado}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tarea.diasAtrasados}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tarea.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Reporte;