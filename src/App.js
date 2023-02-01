import React, { useContext } from "react";
//tabla persona
import TablaPersona from "./components/Persona/TablaPersona";
import Footer from "./components/Footer/Footer";
import MenuLateral from "./components/MenuLateral/MenuLateral";
//importacion de Routes
import { Routes, Route } from "react-router-dom";
import Loader from "./components/loader/Loader";
import { LoaderProvider } from "./contexts/LoaderProvider";
import LoaderContext from "./contexts/LoaderProvider";
//importacion de componentes
import InsertarHistoria from "./components/Historia/InsertarHistoria";
import LogoEsago from "./components/LogoEsago/logoEsago";
import TablaListarHistoria from "./components/Historia/TablaListarHistoria";

const App = () => {
  //contextoGlobal del loader
  const { loader } = useContext(LoaderContext);

  return (
    <>
      {/* si se loguea muestra el menu lateral con las opciones se envuelve toda la aplicacion con el contexto */}
      <MenuLateral estilo={{ backgroundColor: "#016d38" }} />
      <Routes>
        {/* ruta del formulario por defecto */}
        <>
          <Route path="*" element={<InsertarHistoria />} />
          <Route
            path="/historia/listar_historia"
            element={<TablaListarHistoria />}
          />
        </>
      </Routes>

      <Footer estilo={{ backgroundColor: "#016d38" }} />
      {loader && <Loader></Loader>}

      <LogoEsago />
    </>
  );
};

export default App;
