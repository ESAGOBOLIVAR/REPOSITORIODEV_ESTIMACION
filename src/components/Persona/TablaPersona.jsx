import React, { useEffect, useState, useContext } from "react";
//importacion de constante de la configuracion del dataTable
import configuracionDataTable from "../../helpers/configuracionDataTable/configuracionDataTable";
//importacion funcion con promesa para obtener todos los registros
import obtenerAll from "../../helpers/readAll/obtenerAll";
//importacion de editar el modal
import EditarPersonaModal from "./EditarPersonaModal";
//importacion de moment js para fechas
import moment from "moment";
import Loader from "../loader/Loader";
//importacion de estilos de bootstrap
import { Table, Container, Row, Col, Form } from "react-bootstrap";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";

const TablaPersona = () => {
  //contextoGlobal del loader
  const { mostrarLoader, ocultarLoader } = useContext(LoaderContext);

  //estado de tabla
  const [datosTabla, setDatosTabla] = useState([]);
  //estado de elemento a editar
  const [elementoEditar, setElementoEditar] = useState({});
  //estado para mostrar modal
  const [show, setShow] = useState(false);
  //funciones para cerrar y mostrar el modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    obtenerRegistrosTabla();
  }, []);

  //funcion para obtener los datos de la persona
  const obtenerRegistrosTabla = async () => {
    //destruir y limpiar la tabla antes de obtener los datos
    $("#tabla").dataTable().fnClearTable();
    $("#tabla").dataTable().fnDestroy();
    setDatosTabla(null);
    let tabla = "Persona";
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
  };

  //funcion para editar el registro
  //@param {Object} el: es el registro actual a editar
  const editar = (el) => {
    setElementoEditar(el);
    handleShow();
  };

  return (
    <>
      <Container className="mt-5">
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
                    <th scope="col">nombres</th>
                    <th scope="col">apellidos</th>
                    <th scope="col">fecha_nacimiento</th>
                    <th scope="col">telefono</th>
                    <th scope="col">email</th>
                    <th scope="col">direccion</th>
                    <th scope="col">sexo</th>
                    <th scope="col">editar</th>
                  </tr>
                </thead>
                <tbody>
                  {datosTabla.length > 0 &&
                    datosTabla.map((el, index) => (
                      <tr key={index}>
                        <td>{el.nombres}</td>
                        <td>{el.apellidos}</td>
                        <td>
                          {moment.utc(el.fecha_nacimiento).format("DD/MM/YYYY")}
                        </td>
                        <td>{el.telefono}</td>
                        <td>{el.email}</td>
                        <td>{el.direccion}</td>
                        <td>{el.sexo}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => editar(el)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                          </button>
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
        <EditarPersonaModal
          elementoEditar={elementoEditar}
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          handleShow={handleShow}
          obtenerRegistrosTabla={obtenerRegistrosTabla}
        />
      )}
    </>
  );
};

export default TablaPersona;
