import React, { useContext } from "react";
//importacion de useForm para formularios
import { useForm } from "react-hook-form";
//importacion de id random unico
import { v4 as uuidv4 } from "uuid";
//importacion de la funcion para insertar
import insertar from "../../helpers/insert/insertar";
//importacion de la funcion que retorna la alerta
import sweetAlert from "../../helpers/sweetalert/sweetAlert";
//importacion de estilos de bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Boton from "../Button/Boton";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";

const InsertarPersona = () => {
  //contextoGlobal del loader
  const { loader, mostrarLoader, ocultarLoader } = useContext(LoaderContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  //funcion cuando se sube el formulario
  const onSubmit = async (data) => {
    //se ejecuta la funcionalidad de mostrar el Loader
    mostrarLoader();
    let tabla = "Persona";
    //id unico
    let id = uuidv4();

    let datos = { ...data, id };

    console.log(datos);

    //se llama la funcion para insertar a la persona
    //@param {Array} datos: son los datos en objeto del formulario
    //@param {String} tabla: es el nombre de la tabla
    let post = await insertar(datos, tabla);

    //se ejecuta la funcion para ocultar el loader
    ocultarLoader();

    //si la respuesta es success mostrar alerta de success
    //de lo contrario mostrar alerta de error
    //@param {String} icon: es el icono
    //@param {String} title: es el titulo de la alerta
    //@param {String} text: es el texto de la alerta
    post == "success"
      ? sweetAlert("success", "Guardado!", "Guardado Correctamente")
      : sweetAlert(
          "error",
          "Error!",
          "Ups lo sentimos hubo un error intenta mas tarde!"
        );

    //limpiar el formulario
    reset();
  };
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {/* FORMULARIO */}
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-4 border border-1 rounded-4 mt-5 shadow-lg p-3 mb-5 bg-body rounded"
            >
              <Form.Group className="text-center mb-4">
                <h1>Registar Persona</h1>
              </Form.Group>
              <Row className="row">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">
                    Nombres
                  </Form.Label>
                  <Form.Control
                    className="rounded-4 pt-2 pb-2"
                    {...register("nombres", { required: true })}
                  />
                  {errors.nombres && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">
                    Apellidos
                  </Form.Label>
                  <Form.Control
                    className="rounded-4 pt-2 pb-2"
                    {...register("apellidos", { required: true })}
                  />
                  {errors.apellidos && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">
                    Fecha Nacimiento
                  </Form.Label>
                  <Form.Control
                    className="rounded-4 pt-2 pb-2"
                    type="date"
                    {...register("fecha_nacimiento", { required: true })}
                  />
                  {errors.fecha_nacimiento && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    className="rounded-4 pt-2 pb-2"
                    {...register("telefono", { required: true })}
                  />
                  {errors.telefono && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">Email</Form.Label>
                  <Form.Control
                    className="rounded-4 pt-2 pb-2"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">
                    Dirección
                  </Form.Label>
                  <Form.Control
                    className="rounded-4 pt-2 pb-2"
                    {...register("direccion", { required: true })}
                  />
                  {errors.direccion && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">Sexo</Form.Label>
                  <Form.Select {...register("sexo", { required: true })}>
                    <option value="">Seleccione</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                  </Form.Select>
                  {errors.sexo && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Boton
                    variant="primary-jelpit"
                    text={"Guardar"}
                    type="submit"
                    icon={"bi bi-cloud-arrow-up-fill"}
                  ></Boton>
                </Col>
              </Row>
            </Form>
            {/* FIN DE FORMULARIO */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InsertarPersona;
