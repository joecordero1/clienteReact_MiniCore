import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function EditarTarea() {
    const { _id } = useParams();
    const navigate = useNavigate();

    const [tarea, guardarTarea] = useState({
        descripcion: '',
        fechaInicio: '',
        tiempEstimado: '',
        estado: 'ToDo',
        Id_Empleado: '',
        Id_Proyecto: ''
    });

    const [empleados, setEmpleados] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [datosCargados, setDatosCargados] = useState(false);

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

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const response = await clienteAxios.get(`/tareas/${_id}`);
                const tareaData = response.data;
                // Convertir fechaInicio a formato yyyy-MM-dd
                tareaData.fechaInicio = tareaData.fechaInicio.split('T')[0];
                guardarTarea(tareaData);
                setDatosCargados(true);
            } catch (error) {
                console.error('Error al cargar la tarea', error);
            }
        };
        consultarAPI();
    }, [_id]);

    const actualizarState = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    };

    const actualizarTarea = async e => {
        e.preventDefault();

        try {
            const response = await clienteAxios.put(`/tareas/${tarea._id}`, tarea);
            Swal.fire({
                title: "Tarea Actualizada",
                text: response.data.mensaje,
                icon: "success"
            });
            navigate('/tareas');
        } catch (error) {
            console.error('Error al actualizar la tarea', error);
            Swal.fire('Error', 'No se pudo actualizar la tarea', 'error');
        }
    };

    return (
        <div>
            <h2>Editar Tarea</h2>

            <form onSubmit={actualizarTarea}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Descripción:</label>
                    <input
                        type="text"
                        placeholder="Descripción Tarea"
                        name="descripcion"
                        value={tarea.descripcion}
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        name="fechaInicio"
                        value={tarea.fechaInicio}
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Tiempo Estimado (días):</label>
                    <input
                        type="number"
                        placeholder="Tiempo Estimado"
                        name="tiempEstimado"
                        value={tarea.tiempEstimado}
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Estado:</label>
                    <select
                        name="estado"
                        value={tarea.estado}
                        onChange={actualizarState}
                    >
                        <option value="ToDo">ToDo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                {datosCargados && (
                    <>
                        <div className="campo">
                            <label>Empleado:</label>
                            <select
                                name="Id_Empleado"
                                value={tarea.Id_Empleado}
                                onChange={actualizarState}
                            >
                                {empleados.map(empleado => (
                                    <option key={empleado._id} value={empleado._id}>{empleado.nombre} {empleado.apellido}</option>
                                ))}
                            </select>
                        </div>

                        <div className="campo">
                            <label>Proyecto:</label>
                            <select
                                name="Id_Proyecto"
                                value={tarea.Id_Proyecto}
                                onChange={actualizarState}
                            >
                                
                                {proyectos.map(proyecto => (
                                    <option key={proyecto._id} value={proyecto._id}>{proyecto.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

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

export default EditarTarea;