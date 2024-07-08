import React from 'react';
import {Link} from 'react-router-dom'

const Navegacion = () => {
    return (
        <aside className="sidebar col-3">
            <h2>Administrar</h2>
            <nav className="navegacion">
                
                {<Link to={"/"} className="empleados">Empleados</Link>}
                {<Link to={"/Proyectos"} className="proyectos">Proyectos</Link>}
                {<Link to={"/Tareas"} className="tareas">Tareas</Link>}
                
            </nav>
        </aside>
    );
}

export default Navegacion;
