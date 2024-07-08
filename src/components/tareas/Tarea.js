import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Tarea({ tarea }) {
    const { _id, descripcion, estado, Id_Empleado, Id_Proyecto } = tarea;

    const eliminarTarea = id => {
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
                clienteAxios.delete(`/tareas/${_id}`)
                .then(res => {
                    Swal.fire({
                        title: "Eliminado",
                        text: res.data.mensaje,
                        icon: "success"
                    });
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar la tarea', 'error');
                });
            }
        });
    };

    return (
        <li className="tarea">
            <div className="info-tarea">
                <p className="descripcion">{descripcion}</p>
                <p className="estado">Estado: {estado}</p>
                <p className="empleado">Empleado: {Id_Empleado.nombre} {Id_Empleado.apellido}</p>
                <p className="proyecto">Proyecto: {Id_Proyecto.nombre}</p>
            </div>
            <div className="acciones">
                <Link to={`/tareas/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Tarea
                </Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarTarea(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Tarea
                </button>
            </div>
        </li>
    );
}

export default Tarea;
