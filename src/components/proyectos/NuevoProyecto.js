import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { 
        formulario,
        errorFormulario, 
        mostraFormulario, 
        agregarProyecto,
        mostrarError
    } = proyectosContext;

    // State para proyecto
    const [proyecto, setProyecto] = useState({
        nombre: ''
    });
    
    const { nombre } = proyecto;

    // Lee los contenidos del input
    const handleChange = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Cuando envia un proyecto
    const handleSubmit = e => {
        e.preventDefault();

        if(nombre === ''){
            mostrarError();
            return;
        }

        agregarProyecto(proyecto);

        setProyecto({
            nombre: ''
        })
 
    }

    // mostar el formulario
    const handleClick = () => {
        mostraFormulario();
    }


    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={handleClick}
            >Nuevo Proyecto</button>

            {
                formulario ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={handleSubmit}
                    >
                        <input 
                            type="text"
                            className="input-text"
                            name="nombre"
                            value={nombre}
                            placeholder="Nombre Proyecto"
                            onChange={handleChange}
                        />

                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                    </form>
                ) : null
            }
            {
                errorFormulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null
            }
        </Fragment>
     );
}
 
export default NuevoProyecto;