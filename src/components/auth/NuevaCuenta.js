import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';

const NuevaCuenta = props => {

    const alertasContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = alertasContext;

    const authsContext = useContext(authContext);
    const { mensaje, autenticado, registrarUsuario } = authsContext;

    useEffect(() => {
        if(autenticado) props.history.push('/project');

        if(mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    // state para iniciar sesión
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    // extraer de usuario
    const {nombre, email, password, confirmar} = usuario;

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(
            nombre.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === ''
        ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        if(password.length < 6){ 
            mostrarAlerta('La contraseña debe ser al menos de 6 caracteres', 'alerta-error');
            return;
        }

        if(password !== confirmar){ 
            mostrarAlerta('Los password no son iguales', 'alerta-error');
            return;
        }

        registrarUsuario({
            nombre,
            email,
            password
        });

    }


    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Correo electronico"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Contraseña"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Repite tu contraseña"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme"/>
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Inicio de Sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;