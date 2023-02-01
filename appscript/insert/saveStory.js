const borrarESTOOOOOOOOOOOOOOO = () => {
  (data = {
    id: 1234,
    total_horas_netas: 312,
    costo_desarrollo: 231312,
    observaciones: "Unasdas iohasdaskdnas puqw",
    fecha_de_registro: "25/1/2023",
    fecha_ultima_actualizacion: "31/01/2023",
    url_carpeta_general: "jpoijmpom",
    indicativo: "dadasds",
    fecha_tentativa_fin: "",
    total_horas_estimadas: 21,
    total_dias_estimados_exactos: 21,
    total_dias_estimados_entero: 23,
    desarrollador: "desarrolladorBreis",
    numero_de_la_fase: 1,
    url_contrato: "www.ueioqwjax",
    nombre_del_gestor: "Jorge",
    fecha_tentativa_de_inicio: "",
    horas_margen: 312,
  }),
    (subtask = [
      {
        id: 1,
        estimacion_horas: "15",
        descripcion: "descripcion111111111",
        nombre: "funcionalida subir cambios",
        id_historia: "breison",
      },
      {
        id: 2,
        estimacion_horas: "8",
        descripcion: "descripcion2",
        nombre: "funcionalidad hbaajarsg",
        id_historia: "arnulfo",
      },
    ]);
};

// Guardar los datos del registro de historias y subtareas
// @param {Object} data: info proveniente del formulario de historias y subtareas
// @param {Array[Object]} subtask:lista de las subtareas o funcionalidades
function saveStory(data, subtask) {
  try {
    console.log(data);
    console.log(subtask);
    //generar id random desde el backend
    let id = Utilities.getUuid();

    const datos = JSON.parse(data);
    const subtareas = JSON.parse(subtask);
    let insertar = insert({ id, ...datos }, "Historia");

    let respuesta = JSON.parse(insertar);

    //si se guardo correctamente
    if (respuesta == "success") {
      //llamar a la funcion para insertar
      let arregloInsertar = ordenarSubtareasEnArreglo(subtareas, id);
      //llamar la funcion para insertar multiples registros
      insertarSubtareas(arregloInsertar, "Subtarea");
      //@return {Json Stringify} succes: se retorna success si todo es correcto
      return JSON.stringify("success");
    } else {
      //si hay un error
      return JSON.stringify("error");
    }
  } catch (error) {
    console.error(error);
    //@return {Json Stringify} error: se retorna success si todo es correcto
    //si hay un error
    return JSON.stringify("error");
  }
}

// Ordena la lista de subtareas para que coincida con el orden de columnas en excel
// @param {Array} subtask: Arreglo de subtareas
function ordenarSubtareasEnArreglo(subtask, id_historia) {
  //[id,horas,desarrollador]
  let [arregloPrimeraFilaBaseDeDatos] =
    obtenerPrimeraRegistroCalculo("Subtarea");

  let registrosOrdenados = [];
  subtask.map((el) => {
    //@param {Array} arregloPrimeraFilaBaseDeDatos: es el arreglo de la primera fila de las columnas de la base de datos
    //@param {Object} formData: son los datos del formulario en objeto
    let [objetoOrdenado] = ordenarObjeto(arregloPrimeraFilaBaseDeDatos, {
      id_historia,
      ...el,
    });
    registrosOrdenados.push(objetoOrdenado);
  });

  let arregloInsertar = [];
  //iterar los registrosOrdenados
  registrosOrdenados.map((el) => {
    let datos = Object.values(el);
    arregloInsertar.push(datos);
  });
  return arregloInsertar;
}

function insertarSubtareas(arregloInsertar, nombreTabla) {
  //si todo sale bien
  //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
  const [sheetHoja] = asignarNombreHojaDeCalculo(nombreTabla);

  //obtenemos la longitud del arreglo a insertar
  let row = arregloInsertar.length;
  //se obtiene la longitud de la primera fila del arreglo a insertar
  let column = arregloInsertar[0].length;

  sheetHoja
    .getRange(sheetHoja.getLastRow() + 1, 1, row, column)
    .setValues(arregloInsertar);
}
