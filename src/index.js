import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//BROWSER ROUTER PARA ENVOLVER LA APLICACION
import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./contexts/LoaderProvider";
// IMPORTACION DE BOOTSTRAP
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
      <LoaderProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </LoaderProvider>
  </>
);
