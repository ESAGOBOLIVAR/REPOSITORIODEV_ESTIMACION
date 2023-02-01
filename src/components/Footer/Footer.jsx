import React, { useEffect, useState } from "react";
//importacion de componentes de bootstap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//@param {Object} estilo: son los estilos del color de fondo del footer
const Footer = ({ estilo }) => {
  return (
    <>
      {/* FOOTER */}
      <Container
        fluid
        className="text-white mt-5 pb-2 pt-2"
        style={estilo}
      >
        <Row>
          <Col xs={12} className="text-center">
            <p>
              © Seguros Bolívar S.A. {new Date().getFullYear()}. Se prohíbe su
              uso o reproducción sin autorización de la Compañía Seguros Bolívar
              S.A.
            </p>
          </Col>
        </Row>
      </Container>
      {/* FIN FOOTER */}
    </>
  );
};

export default Footer;
