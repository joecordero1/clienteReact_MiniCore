import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function EditarEmpleado() {
    const { _id } = useParams();
    const navigate = useNavigate();

    const [empleado, guardarEmpleado] = useState({
        nombre: '',
        apellido: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const response = await clienteAxios.get(`/empleados/${_id}`);
                guardarEmpleado(response.data);
            } catch (error) {
                console.error('Error al cargar el empleado', error);
            }
        };
        consultarAPI();
    }, [_id]);

    const actualizarState = e => {
        guardarEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        });
    };

    const actualizarEmpleado = async e => {
        e.preventDefault();

        try {
            const response = await clienteAxios.put(`/empleados/${empleado._id}`, empleado);
            Swal.fire({
                title: "Empleado Actualizado",
                text: response.data.mensaje,
                icon: "success"
            });
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar el empleado', error);
            Swal.fire('Error', 'No se pudo actualizar el empleado', 'error');
        }
    };

    return (
        <div>
            <h2>Editar Empleado</h2>

            <form onSubmit={actualizarEmpleado}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Empleado"
                        name="nombre"
                        value={empleado.nombre}
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Empleado"
                        name="apellido"
                        value={empleado.apellido}
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

export default EditarEmpleado;
