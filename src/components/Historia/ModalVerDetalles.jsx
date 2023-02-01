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
const ModalVerDetalles = ({ elementoEditar, show, handleClose }) => {
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

    //@param {String} id: es el id a filtrar
    //@param {String} nombreTabla: es el nombre de la tabla
    obtenerRegistrosTabla(id);
  }, []);

  //estado de tabla
  const [datosTabla, setDatosTabla] = useState([]);

  //funcion para obtener los datos de la tabla
  //funcion para obtener las subtareas
  //@param {String} id: es el id a filtrar
  //@param {String} nombreTabla: es el nombre de la tabla
  const obtenerRegistrosTabla = async (id) => {
    try {
      //setDatosTabla(null);
      let tabla = "Subtarea";
      //mostrar loader
      mostrarLoader();
      //se llama la funcion para insertar a la persona
      //@param {String} tabla: es el nombre de la tabla
      let data = await obtenerAllById(id, tabla);
      console.log(data);
      setDatosTabla(data);
      ocultarLoader();
    } catch (e) {
      //ocultar loader
      ocultarLoader();
      setDatosTabla([]);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} fullscreen={true}>
      <Modal.Header closeButton>
        {/* <Modal.Title>Detalles</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <Row className="d-flex justify-content-center">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <fieldset disabled>
              {/* FORMULARIO */}
              <Form>
                <Form.Group className="text-center mb-4">
                  <h1>Detalles Historia</h1>
                </Form.Group>
                <Row className="row">
                  {/* SECCION DE id */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">id</Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("id")}
                    />
                  </Col>
                  {/* FIN SECCION DE id */}

                  {/* SECCION DE fecha_de_registro */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      fecha de registro
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("fecha_de_registro")}
                    />
                  </Col>
                  {/* FIN SECCION DE fecha_ultima_actualizacion */}

                  {/* SECCION DE fecha_ultima_actualizacion */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      fecha ultima actualizacion
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("fecha_ultima_actualizacion")}
                    />
                  </Col>
                  {/* FIN SECCION DE fecha_ultima_actualizacion */}

                  {/* SECCION DE INDICATIVO */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      Indicativo
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("indicativo")}
                    />
                  </Col>
                  {/* FIN SECCION DE INDICATIVO */}

                  {/* SECCION DE desarrollador */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      Desarrollador
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("desarrollador")}
                    />
                  </Col>
                  {/* FIN SECCION DE desarrollador */}

                  {/* SECCION DE numero_de_la_fase */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      Número de la fase
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("numero_de_la_fase")}
                    />
                  </Col>
                  {/* FIN SECCION DE numero_de_la_fase */}

                  {/* SECCION DE url_carpeta_general */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      URL carpeta general
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("url_carpeta_general")}
                    />
                  </Col>
                  {/* FIN SECCION DE url_carpeta_general */}

                  {/* SECCION DE url_contrato */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      URL Contrato
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("url_contrato")}
                    />
                  </Col>
                  {/* FIN SECCION DE url_contrato */}

                  {/* SECCION DE nombre_del_gestor */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      Nombre del gestor
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("nombre_del_gestor")}
                    ></Form.Control>
                  </Col>
                  {/* FIN SECCION DE nombre_del_gestor */}

                  {/* SECCION DE fecha_tentativa_de_inicio */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      Fecha tentativa inicio
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      type="text"
                      {...register("fecha_tentativa_de_inicio")}
                    />
                  </Col>
                  {/* FIN SECCION DE fecha_tentativa_de_inicio */}

                  {/* SECCION DE fecha_tentativa_de_inicio */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      Fecha tentativa fin
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      type="text"
                      {...register("fecha_tentativa_fin")}
                    />
                  </Col>
                  {/* FIN SECCION DE fecha_tentativa_fin */}

                  {/* SECCION DE total_horas_estimadas */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      total_horas_estimadas{" "}
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("total_horas_estimadas")}
                    />
                  </Col>
                  {/* FIN SECCION DE total_horas_estimadas */}

                  {/* SECCION DE total_dias_estimados_exactos */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      total_dias_estimados_exactos
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("total_dias_estimados_exactos")}
                    />
                  </Col>
                  {/* FIN SECCION DE total_dias_estimados_exactos */}

                  {/* SECCION DE total_dias_estimados_enteros */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      total_dias_estimados_entero
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("total_dias_estimados_entero")}
                    />
                  </Col>
                  {/* FIN SECCION DE total_dias_estimados_entero */}

                  {/* SECCION DE horas_margen */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      horas_margen
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("horas_margen")}
                    />
                  </Col>
                  {/* FIN SECCION DE horas_margen */}

                  {/* SECCION DE total_horas_netas */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      total_horas_netas
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("total_horas_netas")}
                    />
                  </Col>
                  {/* FIN SECCION DE total_horas_netas */}

                  {/* SECCION DE costo_desarrollo */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    xl={4}
                    xxl={4}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      costo_desarrollo
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 pt-2 pb-2"
                      {...register("costo_desarrollo")}
                    />
                  </Col>
                  {/* FIN SECCION DE costo_desarrollo */}

                  {/* SECCION DE observaciones */}
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    className={"mt-3"}
                  >
                    <Form.Label className="text-muted fw-bold">
                      Observaciones
                    </Form.Label>
                    <Form.Control
                      className="rounded-4 py-2 px-3"
                      as="textarea"
                      style={{ height: "110px", resize: "none" }}
                      {...register("observaciones")}
                    />
                  </Col>
                  {/* FIN SECCION DE observaciones */}
                </Row>
              </Form>
              {/* FIN DE FORMULARIO */}
            </fieldset>
          </Col>
        </Row>
        {/* COMPONENTE DE SUBTAREA */}
        {datosTabla.length > 0 && <TablaSubtarea subtarea={datosTabla} />}

        {datosTabla.length == 0 && (
          <Row>
            <Col className="text-center mt-5">
              <p>No hay datos disponibles de subtareas</p>
            </Col>
          </Row>
        )}

        {/* FIN COMPONENTE SUBTAREA */}
      </Modal.Body>
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

export default ModalVerDetalles;
