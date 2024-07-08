import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function EditarProyecto() {
    const { _id } = useParams();
    const navigate = useNavigate();

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const response = await clienteAxios.get(`/proyectos/${_id}`);
                guardarProyecto(response.data);
            } catch (error) {
                console.error('Error al cargar el proyecto', error);
            }
        };
        consultarAPI();
    }, [_id]);

    const actualizarState = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    };

    const actualizarProyecto = async e => {
        e.preventDefault();

        try {
            const response = await clienteAxios.put(`/proyectos/${proyecto._id}`, proyecto);
            Swal.fire({
                title: "Proyecto Actualizado",
                text: response.data.mensaje,
                icon: "success"
            });
            navigate('/proyectos');
        } catch (error) {
            console.error('Error al actualizar el proyecto', error);
            Swal.fire('Error', 'No se pudo actualizar el proyecto', 'error');
        }
    };

    return (
        <div>
            <h2>Editar Proyecto</h2>

            <form onSubmit={actualizarProyecto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={proyecto.nombre}
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                    />
                </div>
            </form>
        </div>
    );
}

export default EditarProyecto;
