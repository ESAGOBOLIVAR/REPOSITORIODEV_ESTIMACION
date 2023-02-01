//funcion para consultar todo
//@param {String} nombreTabla: es el nombre de la tabla a consultar
function readAll(nombreTabla){
  try {
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(nombreTabla);

    //obtener la primera fila de la tabla
    //[columna1,columna2,columna3]
    let [arregloPrimeraFilaBaseDeDatos] =
      obtenerPrimeraRegistroCalculo(nombreTabla);

    //datos de rango de las hojas
    const dataSheetHoja = sheetHoja.getDataRange().getValues();
    //quitar el primer elemento de la hoja de calculo
    dataSheetHoja.shift();
    //longitud de las columnas de la tabla
    let longitudColumnas = arregloPrimeraFilaBaseDeDatos.length - 1;
    //arreglo de los registros
    let arrayRegistros = [];
    //recorrer los registros de la tabla
    dataSheetHoja.map((filas) => {
      //objeto que ira guardando las propiedades y el valor
      let arregloFilas = {};
      //ciclo que va desde la posicion cero hasta la longitud de las columnas +1
      for (i = 0; i <= longitudColumnas + 1; i++) {
        //si la posicion de la columna es menor o igual a la longitud de la columna
        if (i <= longitudColumnas) {
          //ir añadiendo propiedades al objeto conservando las anteriores
          arregloFilas = {
            ...arregloFilas,
            [arregloPrimeraFilaBaseDeDatos[i]]: filas[i],
          };
        } else if (i > arregloPrimeraFilaBaseDeDatos.length - 1) {
          //cuando i es mayor a la longitud del arreglo de la base de datos
          //entonces añadir al arreglo el objeto con sus propiedades
          arrayRegistros.push(arregloFilas);
        }
      }
    });
    //@return {JSON STRING Array} arrayRegistros: es el arreglo de arreglos de objetos con sus propiedades
    //de la tabla
    return JSON.stringify(arrayRegistros);
  } catch (error) {
    //@return "Error en Json"
    return JSON.stringify("error");
  }
};
