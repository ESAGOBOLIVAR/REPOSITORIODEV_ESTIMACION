import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//importacion de react hook forms
import { useForm } from "react-hook-form";
//importacion de moment js para fechas
import moment from "moment";
//importacion de la funcion asincrona para actualizar
import actualizar from "../../helpers/update/actualizar";
//importacion de sweet alert
import sweetAlert from "../../helpers/sweetalert/sweetAlert";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";

const EditarPersonaModal = ({
  elementoEditar,
  show,
  setShow,
  handleClose,
  handleShow,
  obtenerRegistrosTabla,
}) => {
  //contextoGlobal del loader
  const { mostrarLoader, ocultarLoader } = useContext(LoaderContext);
  //cargar 1 sola vez cada vez que se llama el componente
  useEffect(() => {
    console.log("USE EFECT");
  }, []);
  //inicializar los valores por defecto del objeto que se le pasa al dar click
  //desestructuracion para modificar la propiedad de la fecha_nacimiento
  //formato de fechas año-mes-dia
  //YYYY-MM-DD
  //cualquier valor del formulario es necesario modificarlo aqui
  //estado para valores por defecto del formulario
  const [defaultValues, setDefaultValues] = useState({
    ...elementoEditar,
    fecha_nacimiento: moment
      .utc(elementoEditar.fecha_nacimiento)
      .format("YYYY-MM-DD"),
  });

  //estado de mostrar bloquear el formulario de editar
  const [disabledForm, setDisabledForm] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    //se le pasa el valor del estado
    defaultValues: defaultValues,
  });

  const onSubmit = async (datosForm) => {
    //mostrar loader
    mostrarLoader();
    //modificar el estado de la data
    let tabla = "Persona";
    //se llama la funcion para insertar a la persona
    //@param {Array} datos: son los datos en objeto del formulario
    //@param {String} tabla: es el nombre de la tabla
    let update = await actualizar(datosForm, tabla);
    //ocultar loader
    ocultarLoader();
    //si la respuesta es success mostrar alerta de success
    //de lo contrario mostrar alerta de error
    //@param {String} icon: es el icono
    //@param {String} title: es el titulo de la alerta
    //@param {String} text: es el texto de la alerta
    update == "success"
      ? sweetAlert("success", "Actualizado!", "Actualizado Correctamente")
      : sweetAlert(
          "error",
          "Error!",
          "Ups lo sentimos hubo un error intenta mas tarde!"
        );

    //cerrar el formulario
    handleClose();

    //recargar la tabla
    obtenerRegistrosTabla();

    //limpiar el formulario
    //reset();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <fieldset disabled={disabledForm}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 rounded border border-2"
            >
              <div className="row">
                <div className="col-12">
                  <label className="form-label">Nombres</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("nombres", { required: true })}
                  />
                  {errors.nombres && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <label className="form-label">Apellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("apellidos", { required: true })}
                  />
                  {errors.apellidos && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <label className="form-label">Fecha Nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("fecha_nacimiento", { required: true })}
                  />
                  {errors.fecha_nacimiento && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <label className="form-label">Telefono</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("telefono", { required: true })}
                  />
                  {errors.telefono && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("direccion", { required: true })}
                  />
                  {errors.direccion && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <label className="form-label">Sexo</label>
                  <select
                    className="form-control"
                    {...register("sexo", { required: true })}
                  >
                    <option value="">Seleccione</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                  </select>
                  {errors.sexo && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {/* PASAR LO CONTRARIO DE LO QUE TIENE DISABLED FORM PARA PODER EDITAR ELFORM */}
          <Button
            variant="warning"
            onClick={() => setDisabledForm(!disabledForm)}
          >
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarPersonaModal;
