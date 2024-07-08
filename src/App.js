import React, {Fragment} from 'react';

//Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/*** Layout */
import Header from './components/layout/Header'
import Navegacion from './components/layout/Navegacion'
import Empleados from './components/empleados/Empleados';
import NuevoEmpleado from './components/empleados/NuevoEmpleado';
import EditarEmpleado from './components/empleados/EditarEmpledo';
import Proyectos from './components/proyectos/Proyectos';
import NuevoProyecto from './components/proyectos/NuevoProyecto';
import EditarProyecto from './components/proyectos/EditarProyectos';
import Tareas from './components/tareas/Tareas';
import NuevaTarea from './components/tareas/NuevaTarea';
import EditarTarea from './components/tareas/EditarTarea';
import Reportes from './components/reportes/Reporte';


function App () {
  return (
    <Router>
      <Fragment>
        <Header/>

        <div className="grid contenedor contenido-principal">
          <Navegacion/>
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Empleados/>}/>
              <Route path="/empleados/nuevo" element={<NuevoEmpleado/>}/>
              <Route path="/empleados/editar/:_id" element={<EditarEmpleado/>}/>
              <Route path="/proyectos" element={<Proyectos/>}/>
              <Route path="/proyectos/nuevo" element={<NuevoProyecto/>}/>
              <Route path="/proyectos/editar/:_id" element={<EditarProyecto/>}/>
              <Route path="/tareas" element={<Tareas/>}/>
              <Route path="/tareas/nueva" element={<NuevaTarea/>}/>
              <Route path="/tareas/editar/:_id" element={<EditarTarea/>}/>
              <Route path="/reporte" element={<Reportes/>}/>
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>

    
  )

}


export default App;
