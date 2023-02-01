import React, { useContext, useEffect, useState } from "react";
//importacion de useForm para formularios
import { useForm } from "react-hook-form";
//importacion de id random unico
import { v4 as uuidv4 } from "uuid";
//importacion de estilos de bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";
//importacion del componente de la subtarea
import Subtarea from "../Subtarea/Subtarea";
//importacion del componente de la subtarea
import TablaSubtarea from "../Subtarea/TablaSubtarea";
//importacion funcion con promesa para obtener todos los registros
import obtenerAll from "../../helpers/readAll/obtenerAll";
//importacion para insertar la multiple tarea
import insertarMultipleTarea from "../../helpers/insert/insertarMultipleTarea";
//importacion de la funcion que retorna la alerta
import sweetAlert from "../../helpers/sweetalert/sweetAlert";

const InsertarHistoria = () => {
  console.log("INSERTARHISTORIACOMPONENTE");
  //Estado de los desarrolladores
  const [desarrollador, setDesarrollador] = useState([]);

  // Estado de los gestores
  const [gestor, setGestor] = useState([]);

  //estado para las subtareas
  const [subtarea, setSubtarea] = useState([]);

  //estado de estimacionHoras
  const [estimacionHoras, setEstimacionHoras] = useState(0);

  //estado para las horas del desarrollador
  const [horasDesarrollador, setHorasDesarrollador] = useState(0);

  // Division de totalHorasNetas / horasDesarrollador
  const [diasEstimadosExactos, setDiasEstimadosExactos] = useState(0);

  // Aproximación al entero mayor de diasEstimadosExactos
  const [diasEstimadosEnteros, setDiasEstimadosEnteros] = useState(0);

  const [porcentajeMargen, setPorcentajeMargen] = useState(0);

  const [horasMargen, setHorasMargen] = useState(0);

  // Suma de horasMargen + estimacionHoras
  const [totalHorasNetas, setTotalHorasNetas] = useState(0);

  // Valor de la hora por cada desarrollador
  const [valorHoraPorDesarrollador, setValorHoraPorDesarrollador] = useState(0);

  // Costo del desarrollo -> valorHoraPorDesarrollador * totalHorasNetas
  const [costoDesarrollo, setCostoDesarrollo] = useState(0);

  const initialValues = {
    total_horas_estimadas: estimacionHoras,
    total_dias_estimados_exactos: diasEstimadosExactos,
    total_dias_estimados_entero: diasEstimadosEnteros,
    horas_margen: horasMargen,
    total_horas_netas: totalHorasNetas,
  };

  //contextoGlobal del loader
  const { loader, mostrarLoader, ocultarLoader } = useContext(LoaderContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    //inicializamos por defecto los valores
    defaultValues: initialValues,
  });

  //useEffect que se ejecuta cuando carga el HTML
  useEffect(() => {
    obtenerDesarrolladores();
    obtenerGestores();
    obtenerMargen();
  }, []);

  //useEffect que se ejecuta cuando hay un cambio en horasDesarrollador y subtarea
  useEffect(() => {
    obtenerHorasMargen();
  }, [horasDesarrollador, estimacionHoras]);

  useEffect(() => {
    obtenerTotalHorasNetas();
  }, [horasMargen]);

  useEffect(() => {
    obtenerDiasDesarrollo();
    obtenerCostoDesarrollo();
  }, [totalHorasNetas, valorHoraPorDesarrollador]);

  //funcion para obtener los desarrolladores
  const obtenerDesarrolladores = async () => {
    try {
      let tabla = "Desarrollador";
      //se llama la funcion para insertar a la persona
      //@param {String} tabla: es el nombre de la tabla
      let data = await obtenerAll(tabla);
      //asignar al estado
      setDesarrollador(data);
    } catch (e) {
      setDesarrollador([]);
    }
  };

  //funcion para obtener los gestores
  const obtenerGestores = async () => {
    try {
      let tabla = "Gestor";
      let data = await obtenerAll(tabla);
      setGestor(data);
    } catch (error) {
      setGestor([]);
    }
  };

  const obtenerMargen = async () => {
    try {
      const tabla = "Margen";
      const data = await obtenerAll(tabla);
      const totalMargen =
        data.map((e) => e.porcentaje).reduce((a, b) => a + b, 0) / 100;
      setPorcentajeMargen(totalMargen);
    } catch (err) {
      console.log(err);
    }
  };

  const obtenerCostoDesarrollo = () => {
    if (totalHorasNetas > 0 && valorHoraPorDesarrollador > 0) {
      const costoDesarrollo = parseFloat(valorHoraPorDesarrollador) * parseFloat(horasDesarrollador) * parseFloat(diasEstimadosEnteros);
      setCostoDesarrollo(costoDesarrollo);
      console.log(costoDesarrollo);
    }
  };

  //funcion para eliminar la tarea escogida
  //@param {String} id:es el id de la subtarea a eliminar
  const eliminarSubtarea = ({ estimacion_horas, id }) => {
    let filtro = subtarea.filter((el) => el.id != id);
    //asignar al estado el filtro de las subtareas
    setSubtarea(filtro);
    //restar al total de la estimacion en horas
    restarTotalHorasEstimadas(estimacion_horas);
  };

  //funcion para editar la tarea escogida
  const editarSubtarea = (datos) => {
    console.log("Editar");
    console.log(datos);
  };

  //funcion para calcular el total de horas estiamdas
  const sumarTotalHorasEstimadas = (horaEstimada) => {
    setEstimacionHoras((horas) => {
      let suma = parseInt(horas) + parseInt(horaEstimada);
      setValue("total_horas_estimadas", suma);
      return suma;
    });
  };

  //funcion para retar las horas estimadas
  const restarTotalHorasEstimadas = (horaARestar) => {
    setEstimacionHoras((horas) => {
      let resta = parseInt(horas) - parseInt(horaARestar);
      setValue("total_horas_estimadas", resta);
      return resta;
    });
  };

  //funcion para agregar subtareas
  const agregarSubtareas = (datos) => {
    setSubtarea((subtarea) => [...subtarea, datos]);
  };

  //Funcion para obtener horas de desarrollo del desarrollador
  const obtenerHorasXDesarrollador = (nombreDesarrollador) => {
    const horasDesarrollo = desarrollador.filter(
      ({ nombre_desarrollador }) => nombre_desarrollador === nombreDesarrollador
    )[0].horas_desarrollo;
    setHorasDesarrollador(horasDesarrollo);
  };

  const obtenerValorHoraXDesarrollador = (nombreDesarrollador) => {
    const valorHoraPorDesarrollador = desarrollador.filter(
      ({ nombre_desarrollador }) => nombre_desarrollador === nombreDesarrollador
    )[0].valor_hora;
    setValorHoraPorDesarrollador(valorHoraPorDesarrollador);
    console.log(valorHoraPorDesarrollador);
  };

  // Se calculan los días de desarrollos exactos y enteros
  const obtenerDiasDesarrollo = () => {
    if (horasDesarrollador > 0 && totalHorasNetas > 0) {
      const diasDeDesarrollo = Number.parseFloat(
        totalHorasNetas / horasDesarrollador
      ).toFixed(2);
      const diasDeDesarrolloEnteros = Math.ceil(diasDeDesarrollo);
      setValue("total_dias_estimados_exactos", diasDeDesarrollo);
      setValue("total_dias_estimados_entero", diasDeDesarrolloEnteros);
      setDiasEstimadosExactos(diasDeDesarrollo);
      setDiasEstimadosEnteros(diasDeDesarrolloEnteros);
    }
  };

  const obtenerFechaActual = () => {
    let fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();

    return { dia, mes, anio };
  };

  //funcion para obtener las horas margen
  const obtenerHorasMargen = () => {
    const horasMargen = Number.parseFloat(
      estimacionHoras * porcentajeMargen
    ).toFixed(2);
    setHorasMargen(horasMargen);
    setValue("horas_margen", horasMargen);
  };

  const obtenerTotalHorasNetas = () => {
    if (horasMargen > 0 && estimacionHoras > 0) {
      console.log("Horas netas");
      const totalHorasNetas =
        parseFloat(horasMargen) + parseFloat(estimacionHoras);
      setTotalHorasNetas(totalHorasNetas);
      setValue("total_horas_netas", totalHorasNetas);
    }
  };

  const enviarDatos = async () => {
    let peticion = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    //si confirmo es true y  si cancela es cancel
    let { isConfirmed } = peticion;

    if (isConfirmed) {
      console.log("Hacer peticion");
    } else {
      console.log("Cancelo");
    }

    // let resultado=await

    // .then((result) => {
    //   if (result.isConfirmed) {

    //     let post = await insertarMultipleTarea(datos, listaSubtarea);
    //     Swal.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   }
    // })
  };

  //funcion cuando se sube el formulario
  const onSubmit = async (data) => {
    // Swal.fire({
    //   title: "¿Deseas Guardar Los Cambios?",
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: "Guardar",
    //   denyButtonText: `No Guardar`,
    // }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    // if (result.isConfirmed) {
    try {
      let peticion = await Swal.fire({
        title: "¿Desea guardar la estimación?",
        text: "Por favor, verifique antes de confirmar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#016d38",
        cancelButtonColor: "#d33",
        confirmButtonText: '<i class="bi bi-check-circle-fill"></i> Confirmar!',
        cancelButtonText: '<i class="bi bi-x-circle-fill"></i> Cancelar!',
      });

      //si confirmo es true y  si cancela es cancel
      let { isConfirmed } = peticion;

      if (isConfirmed) {
        //se ejecuta la funcionalidad de mostrar el Loader
        mostrarLoader();

        let { dia, mes, anio } = obtenerFechaActual();

        let fecha_de_registro = `${dia}/${mes}/${anio}`;

        let datos = JSON.stringify({ ...data, fecha_de_registro });
        let listaSubtarea = JSON.stringify(subtarea);
        console.log("DATOS", datos);
        console.log("SUBTAREAS", listaSubtarea);
        //se llama la funcion para insertar a la persona
        //@param {Array} datos: son los datos en objeto del formulario
        //@param {String} tabla: es el nombre de la tabla
        let post = await insertarMultipleTarea(datos, listaSubtarea);

        //se debe de limpiar la tabla
        setSubtarea([]);

        //se ejecuta la funcion para ocultar el loader
        ocultarLoader();

        console.log(post);

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
      }
    } catch (e) {
      console.log(e);
      sweetAlert(
        "error",
        "Error!",
        "Ups lo sentimos hubo un error de servidor intenta mas tarde!"
      );
      //alerta que no se pudo guardar
      ocultarLoader();
      //limpiar el formulario
    }
  };

  return (
    <>
      <Container
        fluid
        className="position-relative p-5 bg-white p-4 border border-1 rounded-4 mt-5 shadow-lg p-3 mb-5 bg-body rounded w-75"
      >
        <Row className="d-flex justify-content-center">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {/* FORMULARIO */}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="text-center mb-4">
                <h1>Registrar Historia PRUEBA</h1>
              </Form.Group>
              <Row className="row">
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
                    {...register("indicativo", {
                      required: true,
                    })}
                  />
                  {errors.indicativo && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
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
                  <Form.Select
                    className="rounded-4 pt-2 pb-2"
                    {...register("desarrollador", {
                      required: "Este campo es requerido.",
                    })}
                    onChange={(e) => {
                      console.log(e.target.value);
                      obtenerHorasXDesarrollador(e.target.value);
                      obtenerValorHoraXDesarrollador(e.target.value);
                    }}
                  >
                    <option value="">Seleccione</option>
                    {desarrollador.length > 0 &&
                      desarrollador.map(({ nombre_desarrollador }, index) => (
                        <option value={nombre_desarrollador} key={index}>
                          {nombre_desarrollador}
                        </option>
                      ))}
                  </Form.Select>
                  {errors.desarrollador && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
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
                    {...register("numero_de_la_fase", {
                      required: "Este campo es requerido.",
                      pattern: {
                        value: /^\d+$/,
                        message: "Debes de ser un número entero.",
                      },
                    })}
                  />
                  {errors.numero_de_la_fase && (
                    <span className="text-danger d-block">
                      {errors.numero_de_la_fase.message}
                    </span>
                  )}
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
                    {...register("url_carpeta_general", { required: true })}
                  />
                  {errors.url_carpeta_general && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
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
                    {...register("url_contrato", { required: false })}
                  />
                  {errors.url_contrato && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
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
                  <Form.Select
                    className="rounded-4 pt-2 pb-2"
                    {...register("nombre_del_gestor", {
                      required: "Este campo es requerido.",
                    })}
                  >
                    <option value="">Seleccione</option>
                    {gestor.length > 0 &&
                      gestor.map(({ nombre_gestor }, index) => (
                        <option value={nombre_gestor} key={index}>
                          {nombre_gestor}
                        </option>
                      ))}
                  </Form.Select>
                  {errors.nombre_del_gestor && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
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
                    type="date"
                    {...register("fecha_tentativa_de_inicio", {
                      required: false,
                    })}
                  />
                  {errors.fecha_tentativa_de_inicio && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
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
                    disabled
                    className="rounded-4 pt-2 pb-2"
                    type="date"
                    {...register("fecha_tentativa_fin", {
                      required: false,
                    })}
                  />
                  {errors.fecha_tentativa_fin && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
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
                    Horas estimadas
                  </Form.Label>
                  <Form.Control
                    value={estimacionHoras}
                    disabled
                    className="rounded-4 pt-2 pb-2"
                    {...register("total_horas_estimadas", { required: true })}
                  />
                  {errors.total_horas_estimadas && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                {/* FIN SECCION DE total_horas_estimadas */}

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
                    Horas margen
                  </Form.Label>
                  <Form.Control
                    value={horasMargen}
                    className="rounded-4 pt-2 pb-2"
                    onChange={obtenerTotalHorasNetas}
                    disabled
                    {...register("horas_margen", {
                      required: true,
                    })}
                  />
                  {errors.horas_margen && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
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
                    Total horas netas
                  </Form.Label>
                  <Form.Control
                    value={totalHorasNetas}
                    disabled
                    className="rounded-4 pt-2 pb-2"
                    {...register("total_horas_netas", {
                      required: false,
                    })}
                    onChange={obtenerTotalHorasNetas}
                  />
                  {errors.total_horas_netas && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                {/* FIN SECCION DE total_horas_netas */}

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
                    Días estimados exactos
                  </Form.Label>
                  <Form.Control
                    value={diasEstimadosExactos}
                    className="rounded-4 pt-2 pb-2"
                    disabled
                    {...register("total_dias_estimados_exactos", {
                      required: true,
                    })}
                  />
                  {errors.total_dias_estimados_exactos && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                {/* FIN SECCION DE total_dias_estimados_exactos */}

                {/* SECCION DE total_dias_estimados_entero */}
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
                    Días estimados enteros
                  </Form.Label>
                  <Form.Control
                    value={diasEstimadosEnteros}
                    disabled
                    className="rounded-4 pt-2 pb-2"
                    {...register("total_dias_estimados_entero", {
                      required: true,
                    })}
                  />
                  {errors.total_dias_estimados_entero && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                {/* FIN SECCION DE total_dias_estimados_entero */}

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
                    {...register("observaciones", {
                      required: false,
                      maxLength: {
                        value: 500,
                        message: "Numero de caracteres excedido.",
                      },
                    })}
                  />
                  {errors.observaciones && (
                    <span className="text-danger d-block">
                      {errors.observaciones?.message}
                    </span>
                  )}
                </Col>
                {/* FIN SECCION DE observaciones */}
              </Row>

              {subtarea.length > 0 && (
                <Row className="btn-floating">
                  <Col xs={12}>
                    <Button
                      className="btn"
                      type="submit"
                      style={{ background: "#ffdc5d", color: "#016d38" }}
                    >
                      Confirmar Cambios{" "}
                      <i className="bi bi-cloud-arrow-up-fill"></i>
                    </Button>
                  </Col>
                </Row>
              )}
            </Form>
            {/* FIN DE FORMULARIO */}
          </Col>
        </Row>

        {/* IMPORTACION DEL COMPONENTE DE LA SUBTAREA */}
        <Subtarea
          sumarTotalHorasEstimadas={sumarTotalHorasEstimadas}
          restarTotalHorasEstimadas={restarTotalHorasEstimadas}
          agregarSubtareas={agregarSubtareas}
        />
        {/* FIN DEL COMPONENTE DE LA SUBTAREA */}

        {/* //@param {Array Object}: subtarea es el Arreglo de objeto de las subateas */}
        <>
          <TablaSubtarea
            subtarea={subtarea}
            eliminarSubtarea={eliminarSubtarea}
            editarSubtarea={editarSubtarea}
          />
        </>
      </Container>
    </>
  );
};
export default InsertarHistoria;
