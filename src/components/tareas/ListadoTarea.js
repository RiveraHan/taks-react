import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // context de tareas
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>;

    // extracción del proyecto actual seleccionado
    const [proyectoActual] = proyecto;

    // Selecciona id del proyecto y ejecuta la función de eliminar
    const handleOnClick = () => {
        eliminarProyecto(proyectoActual._id);
    }
    

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre} </h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>) 
                    : 
                    <TransitionGroup>
                    {tareasProyecto.map(tarea => (
                        <CSSTransition
                            key={tarea._id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea 
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={handleOnClick}
            >Eliminar Proyecto &times;</button>

        </Fragment>
     ); 
}
 
export default ListadoTareas;