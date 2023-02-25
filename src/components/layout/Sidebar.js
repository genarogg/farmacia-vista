import React from "react";
import NuevoProyecto from "../proyectos/NuevoProyecto";
import ListadoProyectos from "../proyectos/ListadoProyectos";
const Sidebar = () => {
  return (
    <aside>
      <h1>
         Farmacia<span> A2</span>
      </h1>
      <NuevoProyecto />
      <div className="proyectos">
        <h2>productos</h2>
        <ListadoProyectos />
      </div>
    </aside>
  );
};

export default Sidebar;
