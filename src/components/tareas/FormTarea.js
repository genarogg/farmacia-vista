import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTareas = () => {
  /* Extraer si un proyecto esta activo */
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  /* Obtener la funcion del context de tarea */
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    tareasproyecto,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  /* effect que detecta si hay una tarea seleccionada */
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
        cantidadExistencias: '',
        precio: '',
        fechaV: ''
      });
    }
  }, [tareaseleccionada]);

  /* State del formulario */
  const [tarea, guardarTarea] = useState({
    nombre: "",
    cantidadExistencias: '',
    precio: '',
    fechaV: ''
  });

  /* extraer el nombre del proyecto */
  const { nombre, cantidadExistencias, precio, fechaV } = tarea;
  /* Si no hay proyecto seleccionado */
  if (!proyecto) {
    return null;
  }

  /* Array destructuring para extraer el proyecto actual */
  const [proyectoActual] = proyecto;

  /* Leer los valores del formulario */

  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    /* Validar */
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    else {
     
      
      /* actualizar tarea existente */
      actualizarTarea(tarea)

      /* Eliminar tareaseleccionada del state */
      limpiarTarea()
    }

    /* Pasar la validacion */

    /* Si es edidcion o si es nueva tarea */
    if (tareaseleccionada === null) {

      const id = document.getElementById('contendor-input')
      
      if(id.classList.remove('hidde')){

      }

      
      /* Agregar la nneva tarea al state de tareas */
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    }

    /* Obtener y filtrar las tareas del proyecto actual */
    obtenerTareas(proyectoActual.id);

    /* Reiniciar el form */
    guardarTarea({
      nombre: "",
      cantidadExistencias: 0,
      precio: 0,
      fechaV: ''
    });
  };

  /* Funcion que modifica el estado de las tareas */
  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }

  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contendor-input hidde" id='contendor-input'>
          {
            <>  <input
              type="text"
              className="input-text"
              placeholder="Nombre del Producto..."
              name="nombre"
              value={nombre}
              onChange={handleChange}
            />

              <input
                type="date"
                className="input-text"
                placeholder="Fecha de Vencimiento"
                name="fechaV"
                value={fechaV}
                onChange={(e) => { handleChange(e) }}
              />

              <input
                type="text"
                className="input-text"
                placeholder="Cantidad de existencias"
                name="cantidadExistencias"
                value={cantidadExistencias}
                onChange={(e) => { handleChange(e) }}
              />

              <input
                type="text"
                className="input-text"
                placeholder="Precio"
                name="precio"
                value={precio}
                onChange={(e) => { handleChange(e) }}
              />
              <div className="categorias-filter">
                <div className="estado">
                  {tarea.estado ? (
                    <button
                      type="button"
                      className="completo"
                      onClick={() => cambiarEstado(tarea)}
                    >
                      antibiotico
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="incompleto"
                      onClick={() => cambiarEstado(tarea)}
                    >
                      antibiotico
                    </button>
                  )}
                </div>
                <div className="estado">
                  {tarea.estado ? (
                    <button
                      type="button"
                      className="completo"
                      onClick={() => cambiarEstado(tarea)}
                    >
                      cosmetico
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="incompleto"
                      onClick={() => cambiarEstado(tarea)}
                    >
                      cosmetico
                    </button>
                  )}
                </div>

                <div className="estado">
                  {tarea.estado ? (
                    <button
                      type="button"
                      className="completo"
                      onClick={() => cambiarEstado(tarea)}
                    >
                      Generico
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="incompleto"
                      onClick={() => cambiarEstado(tarea)}
                    >
                      Generico
                    </button>
                  )}
                </div>
              </div>
            </>

          }
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Producto" : "Agregar Producto"}
          />

        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTareas;
