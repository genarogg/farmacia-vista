import React, { useReducer } from "react";
import alertaReducer from "./alertaReducer";
import alertaContext from "./alertaContext";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = (props) => {
  const inititalState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(alertaReducer, inititalState);

  /* Funciones */
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });

    // Después de 5 segundos limpiar la alerta
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };
  

  return (
    <alertaContext.Provider value={{ alerta: state.alerta, mostrarAlerta }}>
      {props.children}
    </alertaContext.Provider>
  );
};

export default AlertaState;
