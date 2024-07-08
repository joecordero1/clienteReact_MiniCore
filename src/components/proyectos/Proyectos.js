import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Proyecto from './Proyecto';

function Proyectos() {
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const response = await clienteAxios.get('/proyectos');
                setProyectos(response.data);
            } catch (error) {
                console.error('Error al cargar los proyectos', error);
            }
        };
        consultarAPI();
    }, []);

    return (
        <Fragment>
            <h2>Proyectos</h2>

            <Link to="/proyectos/nuevo" className="btn btn-verde nvo-proyecto">
                <i className="fas fa-plus-circle"></i>
                Nuevo Proyecto
            </Link>

            <ul className="listado-proyectos">
                {proyectos.map(proyecto => (
                    <Proyecto
                        key={proyecto._id}
                        proyecto={proyecto}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Proyectos;
