import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function NuevaTarea() {
    const [tarea, guardarTarea] = useState({
        descripcion: '',
        fechaInicio: '',
        tiempEstimado: '',
        estado: 'ToDo',
        Id_Empleado: '',
        Id_Proyecto: ''
    });

    const navigate = useNavigate();

    const [empleados, setEmpleados] = useState([]);
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [respuestaEmpleados, respuestaProyectos] = await Promise.all([
                    clienteAxios.get('/empleados'),
                    clienteAxios.get('/proyectos')
                ]);
                setEmpleados(respuestaEmpleados.data);
                setProyectos(respuestaProyectos.data);
            } catch (error) {
                console.log(error);
            }
        };
        cargarDatos();
    }, []);

    const actualizarState = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    };

    const agregarTarea = async e => {
        e.preventDefault();

        try {
            const response = await clienteAxios.post('/tareas', tarea);
            Swal.fire({
                title: "Se agregó una nueva tarea",
                text: response.data.mensaje,
                icon: "success"
            });
            navigate('/tareas');
        } catch (error) {
            console.error('Error al agregar la tarea', error);
            Swal.fire('Error', 'No se pudo agregar la tarea', 'error');
        }
    };

    return (
        <div>
            <h2>Nueva Tarea</h2>

            <form onSubmit={agregarTarea}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Descripción:</label>
                    <input
                        type="text"
                        placeholder="Descripción Tarea"
                        name="descripcion"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        name="fechaInicio"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Tiempo Estimado (días):</label>
                    <input
                        type="number"
                        placeholder="Tiempo Estimado"
                        name="tiempEstimado"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Estado:</label>
                    <select
                        name="estado"
                        onChange={actualizarState}
                    >
                        <option value="ToDo">ToDo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div className="campo">
                    <label>Empleado:</label>
                    <select
                        name="Id_Empleado"
                        onChange={actualizarState}
                    >
                        <option value="">-- Seleccione --</option>
                        {empleados.map(empleado => (
                            <option key={empleado._id} value={empleado._id}>{empleado.nombre} {empleado.apellido}</option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label>Proyecto:</label>
                    <select
                        name="Id_Proyecto"
                        onChange={actualizarState}
                    >
                        <option value="">-- Seleccione --</option>
                        {proyectos.map(proyecto => (
                            <option key={proyecto._id} value={proyecto._id}>{proyecto.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Tarea"
                    />
                </div>
            </form>
        </div>
    );
}

export default NuevaTarea;
