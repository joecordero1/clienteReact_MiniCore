import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Empleado from './Empleado';

function Empleados() {
    const [empleados, setEmpleados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const response = await clienteAxios.get('/empleados');
                setEmpleados(response.data);
            } catch (error) {
                console.error('Error al cargar los empleados', error);
            }
        };
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Empleados</h2>

            <Link to="/empleados/nuevo" className="btn btn-verde nvo-empleado">
                <i className="fas fa-plus-circle"></i>
                Nuevo Empleado
            </Link>

            <ul className="listado-empleados">
                {empleados.map(empleado => (
                    <Empleado
                        key={empleado._id}
                        empleado={empleado}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Empleados;
