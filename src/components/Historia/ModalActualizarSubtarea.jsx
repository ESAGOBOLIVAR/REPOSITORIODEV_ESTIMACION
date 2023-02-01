import React, { useEffect, useState, useContext } from "react";
//importacion componentes de bootstrap
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
//importacion de useForm para formularios
import { useForm } from "react-hook-form";
import obtenerAllById from "../../helpers/filterByAllByid/obtenerAllById";
import TablaSubtarea from "../Subtarea/TablaSubtarea";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";
//@param {Object}: elementoEditar: es el elemento sobre el cual se apreta
const ModalActualizarSubtarea = ({ elementoEditar, show, handleClose }) => {
  //contextoGlobal del loader
  const { mostrarLoader, ocultarLoader } = useContext(LoaderContext);

  const {
    register,
    formState: { errors },
  } = useForm({
    //inicializamos por defecto los valores
    defaultValues: elementoEditar,
  });

  useEffect(() => {
    let { id } = elementoEditar;
    console.log("IDMODAL", id);
  }, []);

  return (
    <Modal show={show} onHide={handleClose} fullscreen={true}>
      <Modal.Header closeButton>
        {/* <Modal.Title>Detalles</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>{/* FIN COMPONENTE SUBTAREA */}</Modal.Body>
      <Modal.Footer className="justify-content-center">
        
        <Button
          variant="secondary"
          onClick={handleClose}
          style={{ background: "#ffdc5d", color: "#016d38" }}
        >
          Cerrar <i className="bi bi-x-square-fill"></i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalActualizarSubtarea;
