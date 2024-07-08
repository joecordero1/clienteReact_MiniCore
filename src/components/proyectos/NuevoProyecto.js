import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function NuevoProyecto() {
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const navigate = useNavigate();

    const actualizarState = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    };

    const agregarProyecto = async e => {
        e.preventDefault();

        try {
            const response = await clienteAxios.post('/proyectos', proyecto);
            Swal.fire({
                title: "Se agregó un nuevo proyecto",
                text: response.data.mensaje,
                icon: "success"
            });
            navigate('/proyectos');
        } catch (error) {
            console.error('Error al agregar el proyecto', error);
            Swal.fire('Error', 'No se pudo agregar el proyecto', 'error');
        }
    };

    return (
        <div>
            <h2>Nuevo Proyecto</h2>

            <form onSubmit={agregarProyecto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Proyecto"
                    />
                </div>
            </form>
        </div>
    );
}

export default NuevoProyecto;
