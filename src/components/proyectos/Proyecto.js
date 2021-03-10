import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    // context de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    // context de tareas
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    // agrega proyecto actual y tareas
    
    const seleccionarProyecto = id => {
        proyectoActual(id);
        obtenerTareas(id);

    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;