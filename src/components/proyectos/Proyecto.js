import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Proyecto({ proyecto }) {
    const { _id, nombre } = proyecto;

    const eliminarProyecto = id => {
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
                clienteAxios.delete(`/proyectos/${_id}`)
                .then(res => {
                    Swal.fire({
                        title: "Eliminado",
                        text: res.data.mensaje,
                        icon: "success"
                    });
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el proyecto', 'error');
                });
            }
        });
    };

    return (
        <li className="proyecto">
            <div className="info-proyecto">
                <p className="nombre">{nombre}</p>
            </div>
            <div className="acciones">
                <Link to={`/proyectos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Proyecto
                </Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProyecto(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Proyecto
                </button>
            </div>
        </li>
    );
}

export default Proyecto;
