import { Button } from "react-bootstrap";
import React from "react";

//@param {String} variant: es la variante texto del boton
//@param {String} className: es la clase del boton
//@param {String} text: es el texto del boton
//@param {String} size: es el es el tamaño del boton del boton
//@param {String} type: es el tipo del boton
//@param {String} icon: es el icono del boton
const Boton = ({ variant, className, text, size, type, icon }) => {
  return (
    <>
      <Button variant={variant} className={className} size={size} type={type}>
        <i className={icon}> </i>
        {text}
      </Button>
    </>
  );
};

export default Boton;
