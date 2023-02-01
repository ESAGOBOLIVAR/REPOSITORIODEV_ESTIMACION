//funcion para actualizar un registro
//@param {String} nombreTabla: es el nombre de la tabla a consultar
//@param {String} id: es el id actualizar
//para actualizar es importante pasar el id y el dato actualizar
const update = (formData, nombreTabla) => {
  try {
    //si todo sale bien
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(nombreTabla);

    //arreglo de rango de datos
    const dataSheetHoja = sheetHoja.getDataRange().getValues();

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

    //acceder a las propiedades ordenadas
    let arregloDatosPropiedades = Object.keys(objetoOrdenado);

    ////////////
    //id recibido
    let id = formData.id;
    //posiciones del id del usuario y de la fecha de modificacion
    let posicionId;

    //recorrer el primer registro
    arregloPrimeraFilaBaseDeDatos.map((el, index) => {
      //si la columna es igual a id entonces
      if (el == "id") {
        //posicion del id en la base de datos
        posicionId = index;
      }
    });

    //si existe un id entonces recorrer la base de datos y buscar el id
    //si no lo encuentra retorna -1
    let indiceRegistroEncontrado = dataSheetHoja.findIndex(
      (el) => el[posicionId] == id
    );

    let registroEncontrado = dataSheetHoja.find((el) => el[posicionId] == id);

    //si lo encuentra entonces verificar que datos han cambiado para hacer el update
    if (indiceRegistroEncontrado && registroEncontrado) {
      //recorrer los datos del registro encontrado
      registroEncontrado.map((el, index) => {
        // console.log("el" + el);
        //si los datos recibidos del formulario son diferentes a el
        //y los datos de arreglo sub index es diferente de vacio entonces modificar
        if (arregloDatos[index] != el && arregloDatos[index] != "") {
          //dato diferente para actualizar
          let datoUpdate = arregloDatos[index];

          //acceder a la hoja y al rango
          let fila = indiceRegistroEncontrado + 1;
          let columna = index + 1;
          //@param {Int} fila: posicion fila
          //@param {Int} columna: posicion columna
          //@param {} datoUpdate: es el dato actualizar en la base de datos
          let rango = sheetHoja.getRange(fila, columna).setValue(datoUpdate);
        }
      });

      //@return {String} si todo sale correcto se retorna success
      return JSON.stringify("success");
    }
  } catch (error) {
    //si ocurre algun error retorna error
    return JSON.stringify("error");
  }
};
