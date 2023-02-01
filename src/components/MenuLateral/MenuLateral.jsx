import React from "react";
import { NavLink } from "react-router-dom";
//obtener el contexto del usuario

//@param {Object} estilo: son los estilos del color de fondo del menu
const MenuLateral = ({ estilo }) => {
  //contexto global del usuario logueado
  return (
    <>
      {/* <!--NAVBAR--> */}
      <nav className="navbar navbar-dark" style={estilo}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#menu"
            aria-controls="menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="text-rigth bg-light">
            <img
              src="https://raw.githubusercontent.com/ESAGOBOLIVAR/recursos-de-imagenes/logo-bolivar/Capa%202%20(1).png"
              width={180}
            ></img>
          </div>
        </div>
      </nav>
      {/* <!--FIN NAVBAR--> */}

      {/* <!--SIDEBAR--> */}
      <div
        className="offcanvas offcanvas-start text-white"
        style={estilo}
        tabIndex="-1"
        id="menu"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Menú
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <hr />
        <div className="offcanvas-body">
          {/* <!--NAV VERTICAL--> */}
          <ul className="nav flex-column nav-pills mb-auto">
            <li className="nav-item">
              <NavLink
                to="*"
                className="btn rounded d-block"
                style={{ background: "#ffdc5d", color: "#016d38" }}
              >
                <i className="bi bi-plus-square-fill"></i>Registrar Historia
              </NavLink>

              <NavLink
                to="/historia/listar_historia"
                className="btn rounded d-block mt-5"
                style={{ background: "#ffdc5d", color: "#016d38" }}
              >
                <i className="bi bi-list-columns-reverse"></i>Listar Historias
              </NavLink>
            </li>
          </ul>

          {/* <!-- FIN NAV VERTICAL--> */}
          <hr />
        </div>
      </div>
      {/* <!--FIN SIDEBAR--> */}
    </>
  );
};

export default MenuLateral;
