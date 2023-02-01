import React from "react";
//importacion de estilos de bootstrap
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
//@param {Array Object}: subtarea es el Arreglo de objeto de las subateas
//@param {Funcion}: eliminarSubtarea: funcion para eliminar la tarea
const TablaSubtarea = ({ subtarea, eliminarSubtarea = "",editarSubtarea="" }) => {
  return (
    <>
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Subtareas</h1>
          <Table responsive>
            <thead>
              <tr>
                {/* <th>id subtarea</th>
              <th>id de historia</th> */}
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Estimacion Horas</th>
                {eliminarSubtarea != "" && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {subtarea.length > 0 &&
                subtarea.map(
                  ({ id, nombre, descripcion, estimacion_horas }, index) => (
                    <tr key={index}>
                      {/* <td>{id}</td>
                    <td>{id}</td> */}
                      <td>{nombre}</td>
                      <td className="word-break">{descripcion}</td>
                      <td>{estimacion_horas}</td>
                      {eliminarSubtarea != "" && (
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-warning mx-2 text-white"
                              title="Editar Subtarea"

                              onClick={() => editarSubtarea({id, nombre, descripcion, estimacion_horas})}
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button
                              className="btn btn-danger"
                              title="Borrar Subtarea"
                              onClick={() =>
                                eliminarSubtarea({ id, estimacion_horas })
                              }
                            >
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                )}

              {/* <tr>
            <td>Total de horas</td>80
          </tr> */}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default TablaSubtarea;
