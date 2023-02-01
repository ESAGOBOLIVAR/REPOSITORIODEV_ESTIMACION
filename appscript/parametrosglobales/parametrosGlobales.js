//parametros globales de los ids
//Implementado por mauricio.araujo@servinformacion.com
const parametrosGlobales = () => {
  return {
    idBaseDeDatos: "1y4exVN-q3ISq37Yy15cEt4ewUBQQx8vbNpwGe4m0xTU", //id original
  };
};

//conexion a la base de datos
const conexionBaseDeDatos = () => {
  const { idBaseDeDatos } = parametrosGlobales();
  //se abre la conexion de la base de datos
  const BD = SpreadsheetApp.openById(idBaseDeDatos);
  //@return {object} BD: se retorna la base de datos
  return { BD };
};

//asignar nombre
//@param {String} nombreSheet: es el nombre de la hoja de calculo
function asignarNombreHojaDeCalculo(nombreSheet = "") {
  //se obtiene la base de datos
  const { BD } = conexionBaseDeDatos();
  //se obtiene el nombre de la base de datos
  const sheetHoja = BD.getSheetByName(nombreSheet);
  //@return {Array} sheetHoja: hoja de la base de datos
  return [sheetHoja];
}

//funcion para obtener la primera fila de cada tabla
function obtenerPrimeraRegistroCalculo(nombreTabla) {
  //obtener la hoja de calculo
  const [sheetHoja] = asignarNombreHojaDeCalculo(nombreTabla);

  //arreglo de rango de datos
  const dataSheetHoja = sheetHoja.getDataRange().getValues();

  const dataSheetHojaFirstData = dataSheetHoja.shift();

  //@return [Array] dataSheetHoja: es el arreglo de la primera fila nombres de las columnas
  return [dataSheetHojaFirstData];
}

//funcion para ordenar el objeto
//@param {Array} arregloPrimeraFilaBaseDeDatos: es el arreglo de la primera fila de las columnas de la base de datos
//@param {Object} formData: son los datos del formulario en objeto
function ordenarObjeto(arregloPrimeraFilaBaseDeDatos, formData) {
  //obtener las propiedades del formulario
  let claves = Object.keys(formData);
  //objeto donde se ordenara el arreglo recibido del formulario
  let objetoOrdenado = {};

  let longitudArregloClaves = claves.length - 1;

  //recorrer las columnas del arreglo de las columnas de la base de datos
  arregloPrimeraFilaBaseDeDatos.map((el) => {
    ////////////
    for (let j = 0; j <= longitudArregloClaves; j++) {
      let propiedad = claves[j];
      if (propiedad == el) {
        //si la propiedad es igual a la columna
        //validar que j sea menor a la longitud del arreglo del form
        if (j <= longitudArregloClaves) {
          //console.log(objetoOrdenado[el])
          //insertar la propiedad y el valor de la propiedad
          objetoOrdenado[el] = formData[el];
          //para el ciclo
          break;
        }
      } else {
        //validar si j es menor a la longitud -1 e insertar la propiedad vacia
        if (j <= longitudArregloClaves - 1) {
          objetoOrdenado[el] = "";
        } else {
          //en caso contrario continue para seguir interactuando sobre las propiedades
          continue;
        }
      }
    }
  });

  //console.log(objetoOrdenado)
  //@return {Object} objetoOrdenado: es el objeto del formulario ordenado
  return [objetoOrdenado];
}

//funcion para obtener registro informacion en base a id
const readById = () => {};
