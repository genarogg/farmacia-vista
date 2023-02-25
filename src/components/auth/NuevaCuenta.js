import React, { useState,useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  /* Extraer los valores del context */
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  /* En caso de qeu el usuariok se haya autenticado o registrado o sea un registro duplicado */

  useEffect(() => {
   if(autenticado){
    props.history.push('/proyectos')
   }

   if(mensaje){
    mostrarAlerta(mensaje.msg, mensaje.categoria);
  
   }
   // eslint-disable-next-line
  }, [mensaje, autenticado, props.history])
  

  /* State para iniciar Sesión */
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  /* Extraer Usuario */
  const { nombre, email, password, confirmar } = usuario;
  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  /* Cuando el usuario quiere iniciar sesion */
  const onSubmit = (e) => {
    e.preventDefault();
    
    /* Validar que no haya campos vacios */
    if (
      (nombre.trim() === "" || email.trim() === "" || password.trim() === "",
      confirmar.trim() === "")
    ) {
      mostrarAlerta("Todos los campos son obligatorios", " alerta-error");
      return;
    }
    /* Longitud del password de minimo 6 caracteres */

    if (password.length < 6) {
      mostrarAlerta(
        "El password debe de ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    /* Comporbar que los 2 password sean iguales */
    if (password !== confirmar) {
      mostrarAlerta("los password deben de ser iguales", "alerta-error");
      return;
    }

    /* Pasarlo al action */

    registrarUsuario({ nombre, email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="comfirmar">Confirmar Password</label>
            <input
              type="password"
              name="confirmar"
              id="confirmar"
              placeholder="Repite tu password"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="Registrarme"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
