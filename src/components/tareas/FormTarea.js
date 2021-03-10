import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // context de tarea
    const tareasContext = useContext(tareaContext);
    const { 
        errorTarea,
        tareaSeleccionada, 
        agregarTarea, 
        validarTarea, 
        obtenerTareas,
        actualizarTarea,
        limpiarTarea 
    } = tareasContext;

    useEffect(() => {
        if(tareaSeleccionada !== null) {
            setTarea(tareaSeleccionada)
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])

    const [tarea, setTarea] = useState({
        nombre: ''
    });
    const { nombre } = tarea;

    // En caso que no haya proyecto seleccionado no mostrará el form
    if(!proyecto) return null;

    const [proyectoActual] = proyecto;

    const handleSubmit = e => {
        e.preventDefault();

        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        if(tareaSeleccionada === null) {

            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            actualizarTarea(tarea); //Actualizar tarea seleccionada
            // limpia tarea seleccionada
            limpiarTarea();
        }

        // obtenemos las nuevas tareas del proyecto
        obtenerTareas(proyectoActual.id);

        setTarea({
            nombre: ''
        })

    }

    // agregar tarea

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })

    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;