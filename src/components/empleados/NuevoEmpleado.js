import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function NuevoEmpleado() {
    const [empleado, guardarEmpleado] = useState({
        nombre: '',
        apellido: ''
    });

    const navigate = useNavigate();

    const actualizarState = e => {
        guardarEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        });
    };

    const agregarEmpleado = async e => {
        e.preventDefault();

        try {
            const response = await clienteAxios.post('/empleados', empleado);
            Swal.fire({
                title: "Se agregó un nuevo empleado",
                text: response.data.mensaje,
                icon: "success"
            });
            navigate('/empleados');
        } catch (error) {
            console.error('Error al agregar el empleado', error);
            Swal.fire('Error', 'No se pudo agregar el empleado', 'error');
        }
    };

    return (
        <div>
            <h2>Nuevo Empleado</h2>

            <form onSubmit={agregarEmpleado}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Empleado"
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Empleado"
                        name="apellido"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Empleado"
                    />
                </div>
            </form>
        </div>
    );
}

export default NuevoEmpleado;
