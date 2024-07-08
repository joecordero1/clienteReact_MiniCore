import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Tarea from './Tarea';

function Tareas() {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const response = await clienteAxios.get('/tareas');
                setTareas(response.data);
            } catch (error) {
                console.error('Error al cargar las tareas', error);
            }
        };
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Tareas</h2>

            <Link to="/tareas/nueva" className="btn btn-verde nvo-tarea">
                <i className="fas fa-plus-circle"></i>
                Nueva Tarea
            </Link>

            <ul className="listado-tareas">
                {tareas.map(tarea => (
                    <Tarea
                        key={tarea._id}
                        tarea={tarea}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Tareas;
