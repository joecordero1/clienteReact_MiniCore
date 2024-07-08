import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Empleado({ empleado }) {
    const { _id, nombre, apellido } = empleado;

    const eliminarEmpleado = id => {
        Swal.fire({
            title: "Confirmación",
            text: "No es posible revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar"
        }).then(result => {
            if (result.value) {
                clienteAxios.delete(`/empleados/${_id}`)
                .then(res => {
                    Swal.fire({
                        title: "Eliminado",
                        text: res.data.mensaje,
                        icon: "success"
                    });
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el empleado', 'error');
                });
            }
        });
    };

    return (
        <li className="empleado">
            <div className="info-empleado">
                <p className="nombre">{nombre} {apellido}</p>
            </div>
            <div className="acciones">
                <Link to={`/empleados/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Empleado
                </Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarEmpleado(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Empleado
                </button>
            </div>
        </li>
    );
}

export default Empleado;
