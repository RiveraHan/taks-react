import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import clienteAxios from '../../config/axios';
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    ELIMINAR_ERROR
 } from '../../types';

 
 const ProyectoState = props => {
   
    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    }

    // Dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // cambia el estado del formulario de proyecto
    const mostraFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Muestra los proyectos
    const mostrarProyectos = async () => {
       
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ELIMINAR_ERROR,
                payload: alerta
            })
            
        }
    }

    // Obtener proyecto
    const agregarProyecto = async proyecto => {

        try {
            const respuesta = await clienteAxios.post('/api/proyectos', proyecto);
            
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: respuesta.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ELIMINAR_ERROR,
                payload: alerta
            })
            
        }

        
    }

    // Mostrar error de formulario
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyecto => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyecto
        })
    }

    // Elimina un proyecto
    const eliminarProyecto = async proyectoId =>{
        
        try {

            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ELIMINAR_ERROR,
                payload: alerta
            })
            
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostraFormulario,
                mostrarProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto

            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );
}

export default ProyectoState;