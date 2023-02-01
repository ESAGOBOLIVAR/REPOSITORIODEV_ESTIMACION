import React, { useState } from "react";
//importacion de estilos de bootstrap
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
//importacion de useForm para formularios
import { useForm } from "react-hook-form";
//importacion de id random unico
import { v4 as uuidv4 } from "uuid";

const initialValues = {
  nombre: "",
  estimacion_horas: "",
  descripcion: "",
};
// import TablaSubtarea from "./TablaSubtarea";
//@param {Function} sumarTotalHorasEstimadas funcion para sumar las horas estimadas
//@param {Function} restarTotalHorasEstimadas funcion para restar las horas estimadas
//@param {Function} agregarSubtareas funcion para agregar las subtareas
//@param {Object} valoresFormulario: son los valores del formulario iniciales
const Subtarea = ({
  sumarTotalHorasEstimadas = "",
  agregarSubtareas = "",
  valoresFormulario = initialValues,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    //inicializamos por defecto los valores
    defaultValues: valoresFormulario,
  });

  //funcion cuando se sube el formulario
  const onSubmit = async (data) => {
    //id unico
    let id = uuidv4();

    let datos = { ...data, id, estado: "activo" };
    console.log(datos);

    let { estimacion_horas } = data;

    agregarSubtareas(datos);

    //@param {String} estimacion_horas: es el estado de la estimacion de horas
    sumarTotalHorasEstimadas(estimacion_horas);

    //le asigne [{fsdfsdf:dfsdf}]

    //setSubstarea((substarea) => substarea);

    //calcularTotalDeHoras();
    //se llama la funcion para insertar a la persona
    //@param {Array} datos: son los datos en objeto del formulario
    //@param {String} tabla: es el nombre de la tabla
    //let post = await insertar(datos, tabla);

    //se ejecuta la funcion para ocultar el loader
    //ocultarLoader();

    //si la respuesta es success mostrar alerta de success
    //de lo contrario mostrar alerta de error
    //@param {String} icon: es el icono
    //@param {String} title: es el titulo de la alerta
    //@param {String} text: es el texto de la alerta
    // post == "success"
    //   ? sweetAlert("success", "Guardado!", "Guardado Correctamente")
    //   : sweetAlert(
    //       "error",
    //       "Error!",
    //       "Ups lo sentimos hubo un error intenta mas tarde!"
    //     );

    //limpiar el formulario
    reset();
  };

  return (
    <>
      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="text-center mb-4">
            <h1>Registrar Subtarea</h1>
          </Form.Group>
          <Row>
            {/* SECCION DE nombre */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Form.Label className="text-muted fw-bold">Nombre</Form.Label>
              <Form.Control
                className="rounded-4 pt-2 pb-2"
                {...register("nombre", {
                  required: "Este campo es requerido",
                  maxLength: {
                    value: 100,
                    message: "Numero de caracteres excedido.",
                  },
                })}
              />
              {errors.nombre && (
                <span className="text-danger d-block">
                  {errors.nombre?.message}
                </span>
              )}
            </Col>
            {/* FIN SECCION DE nombre */}

            {/* SECCION DE estimacion_horas */}
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Form.Label className="text-muted fw-bold">
                Estimacion horas
              </Form.Label>
              <Form.Control
                type="text"
                className="rounded-4 pt-2 pb-2"
                {...register("estimacion_horas", {
                  required: "Campo requerido",
                  pattern: {
                    value: /^\d+$/,
                    message: "Debes de ser un número entero",
                  },
                  max: {
                    value: 10,
                    message: "El máximo de horas es 10.",
                  },
                  min: {
                    value: 1,
                    message: "El mínimo de horas es 1.",
                  },
                })}
              />
              {errors.estimacion_horas && (
                <span className="text-danger d-block">
                  {errors.estimacion_horas.message}
                </span>
              )}
            </Col>
            {/* FIN SECCION DE estimacion_horas */}

            {/* SECCION DE descripcion */}
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Label className="text-muted fw-bold">
                Descripcion
              </Form.Label>
              <Form.Control
                className="rounded-4 py-2 px-3"
                as="textarea"
                style={{ height: "110px", resize: "none" }}
                {...register("descripcion", {
                  required: "Este campo es requerido",
                  maxLength: {
                    value: 500,
                    message: "Numero de caracteres excedido.",
                  },
                })}
              />
              {errors.descripcion && (
                <span className="text-danger d-block">
                  {errors.descripcion?.message}
                </span>
              )}
            </Col>
            {/* FIN SECCION DE descripcion */}

            {/* SECCION DE BOTON */}
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <div className="text-center">
                <Button
                  className="btn mt-4"
                  type="submit"
                  style={{ background: "#ffdc5d", color: "#016d38" }}
                >
                  Agregar <span className="bi bi-plus-circle"></span>
                </Button>
              </div>
            </Col>
            {/* FIN SECCION BOTON */}
          </Row>
        </Form>
        {/* FIN DE FORMULARIO */}
      </Row>
    </>
  );
};

export default Subtarea;
