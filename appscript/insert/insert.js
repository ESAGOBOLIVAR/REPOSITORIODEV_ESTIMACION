//obtener todos los datos del inventario
//@param {Object} formData: son los datos en objeto del formulario
//@param {String} nombreTabla: es el nombre de la tabla a insertar
function insert(formData, nombreTabla) {
  try {
    //si todo sale bien
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(nombreTabla);

    //obtener la primera fila de la tabla
    //[columna1,columna2,columna3]
    let [arregloPrimeraFilaBaseDeDatos] =
      obtenerPrimeraRegistroCalculo(nombreTabla);

    //agregar lastModified al formulario (agregar la fecha de modificacion)

    //@param {Array} arregloPrimeraFilaBaseDeDatos: es el arreglo de la primera fila de las columnas de la base de datos
    //@param {Object} formData: son los datos del formulario en objeto
    let [objetoOrdenado] = ordenarObjeto(
      arregloPrimeraFilaBaseDeDatos,
      formData
    );

    //acceder a los valores del objeto para insertar
    let arregloDatos = Object.values(objetoOrdenado);

    //@param [Array] arregloDatos: es el arreglo de datos a insertar
    let insertar = sheetHoja.appendRow(arregloDatos);

    //@return {Json Stringify} succes: se retorna success si todo es correcto
    return JSON.stringify("success");
  } catch (error) {
    console.error(error);
    //@return {Json Stringify} error: se retorna success si todo es correcto
    //si hay un error
    return JSON.stringify("error");
  }
}
