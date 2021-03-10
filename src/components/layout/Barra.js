import React, {useContext, useEffect} from 'react';
import authContext from '../../context/autenticacion/authContext';

const Barra = () => {

    // Extraer la información de la
    const authsContext = useContext(authContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authsContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
            
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;