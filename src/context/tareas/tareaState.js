import React, { useReducer} from 'react';
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';


const TareaState = props => {
    
    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    // dispatch del state
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        
        try {
            
           const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            
        }
    }

    // agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        console.log(tarea);
        
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            

            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar una tarea
    const eliminarTarea = async (id, proyecto) => {
       try {
           await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});

           dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
       } catch (error) {
           console.log(error);
           
       }
    }

    // EDITA O MODIFICA UNA TAREA
    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
            
        }
        
    }
    // extra la tarea para edición
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // limpia tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value = {{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;