import React from "react";
//importacion de estilos de bootstrap
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
const DatosActualesHistoria = ({
  id,
  indicativo,
  desarrollador,
  numero_de_la_fase,
  url_carpeta_general,
  nombre_del_gestor,
  fecha_tentativa_de_inicio,
  fecha_tentativa_fin,
}) => {
  return (
    <Row>
      <Col className="bg-white p-4 border border-1 rounded-4 mt-5 shadow-lg p-3 bg-body rounded">
        <h1>Datos Actuales Historia</h1>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>indicativo</th>
              <th>desarrollador</th>
              <th>numero_de_la_fase</th>
              <th>url_carpeta_general</th>
              <th>nombre_del_gestor</th>
              <th>fecha_tentativa_de_inicio</th>
              <th>fecha_tentativa_fin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{id}</td>
              <td>{indicativo}</td>
              <td>{desarrollador}</td>
              <td>{numero_de_la_fase}</td>
              <td>{url_carpeta_general}</td>
              <td>{nombre_del_gestor}</td>
              <td>{fecha_tentativa_de_inicio}</td>
              <td>{fecha_tentativa_fin}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default DatosActualesHistoria;
