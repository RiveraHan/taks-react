import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import alertaContext from '../../context/alertas/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext);
    const {mensaje, proyectos, mostrarProyectos} = proyectosContext;

    const alertasContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = alertasContext;

    useEffect(() => {

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        mostrarProyectos();
        // eslint-disable-next-line
    },[mensaje]);

    // Encaso que no hayan proyectos
    if(proyectos === 0 || proyectos === null) return <p>No hay proyectos, ¡Crea uno!</p>;

    return ( 
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
            {proyectos.map(proyecto => (
                <CSSTransition
                
                    key={proyecto._id}
                    timeout={200}
                    classNames="proyecto"
                >
                    <Proyecto
                        proyecto={proyecto}
                    />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;