import React, { useEffect, useState, useContext } from "react";
//importacion de constante de la configuracion del dataTable
import configuracionDataTable from "../../helpers/configuracionDataTable/configuracionDataTable";
//importacion funcion con promesa para obtener todos los registros
import obtenerAll from "../../helpers/readAll/obtenerAll";
//importacion de estilos de bootstrap
import { Table, Container, Row, Col, Form, Button } from "react-bootstrap";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";
//importacion de moment js para fechas
import moment from "moment";
//useNavigate sirve para navegar o redireccionar
import { useNavigate } from "react-router-dom";
import ModalVerDetalles from "./ModalVerDetalles";

const TablaListarHistoria = () => {
  //contextoGlobal del loader
  const { mostrarLoader, ocultarLoader } = useContext(LoaderContext);

  //estado de tabla
  const [datosTabla, setDatosTabla] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    obtenerRegistrosTabla();
    console.log("Caragado una vez");
  }, []);

  //estado de elemento a editar
  const [elementoEditar, setElementoEditar] = useState({});
  //estado para mostrar modal
  const [show, setShow] = useState(false);
  //funciones para cerrar y mostrar el modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //funcion para obtener los datos de la persona
  const obtenerRegistrosTabla = async () => {
    try {
      //destruir y limpiar la tabla antes de obtener los datos
      $("#tabla").dataTable().fnClearTable();
      $("#tabla").dataTable().fnDestroy();
      setDatosTabla(null);
      let tabla = "Historia";
      //mostrar loader
      mostrarLoader();
      //se llama la funcion para insertar a la persona
      //@param {String} tabla: es el nombre de la tabla
      let data = await obtenerAll(tabla);
      console.log(data);
      //asignar los datos a la tabla
      setDatosTabla(data);
      //ocultar loader
      ocultarLoader();
      $(document).ready(function () {
        //@param {object} configuracionDatatable: es la configuracion del datatable en español
        $("#tabla").DataTable(configuracionDataTable);
      });
    } catch (e) {
      //destruir y limpiar la tabla antes de obtener los datos
      $("#tabla").dataTable().fnClearTable();
      $("#tabla").dataTable().fnDestroy();
      //ocultar loader si hay algun error en la base de datos
      ocultarLoader();
      setDatosTabla([]);

      $(document).ready(function () {
        //@param {object} configuracionDatatable: es la configuracion del datatable en español
        $("#tabla").DataTable(configuracionDataTable);
      });
    }
  };

  //funcion para editar el registro
  //@param {Object} el: es el registro actual a ver
  const verDetalles = (el) => {
    setElementoEditar(el);
    handleShow();
  };

  return (
    <>
      <Container fluid className="mt-5">
        <Row>
          <Col className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => obtenerRegistrosTabla()}
            >
              Recargar Tabla
            </button>
          </Col>
          <Col className="col-12 table-responsive mt-4 bg-white p-4 border border-1 rounded-4 mt-5 shadow-lg p-3 mb-5 bg-body rounded">
            {/* MIENTRAS CARGA LOS DATOS MUESTRE UN LOADER DE CARGANDO */}
            {/* {datosTabla == null && <Loader />} */}
            {/* EN CASO CONTRARIO MUESTRA LA TABLA CON O SIN DATOS */}
            {datosTabla !== null && (
              <Table className="table hover" id="tabla">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Fecha de registro</th>
                    <th scope="col">Indicativo</th>
                    <th scope="col">Desarrollador</th>
                    <th scope="col">Fase</th>
                    <th scope="col">URL carpeta general</th>
                    <th scope="col">Nombre del gestor</th>
                    <th scope="col">Total horas estimadas</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {datosTabla.length > 0 &&
                    datosTabla.map((el, index) => (
                      <tr key={index}>
                        <td>{el.id}</td>
                        <td>
                          {moment
                            .utc(new Date(el.fecha_de_registro))
                            .format("DD/MM/YYYY")}
                        </td>
                        <td>{el.indicativo}</td>
                        <td>{el.desarrollador}</td>
                        <td>{el.numero_de_la_fase}</td>
                        <td>
                          <a href={el.url_carpeta_general} target={"_blank"}>
                            Enlace carpeta
                            <i className="bi bi-link-45deg"></i>
                          </a>
                        </td>
                        <td>{el.nombre_del_gestor}</td>
                        <td>{el.total_horas_estimadas}</td>
                        <td>
                          <Button
                            variant="primary"
                            className="text-white"
                            onClick={() => verDetalles(el)}
                            title="Ver Detalles"
                          >
                            <i className="bi bi-eye-fill"></i>
                          </Button>
                          <Button
                            variant="warning"
                            className="mx-2 text-white"
                            //onClick={() => verDetalles(el)}
                            title="Editar"
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>

      {/* MODAL PARA EDITAR si show es verdadero mostrar el modal */}
      {show && (
        <ModalVerDetalles
          elementoEditar={elementoEditar}
          show={show}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default TablaListarHistoria;
