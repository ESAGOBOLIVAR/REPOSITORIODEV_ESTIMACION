//funcion de loguearse
//@param {Object} formData: son los datos en objeto del formulario del login
//@param {String} nombreTabla: es el nombre de la tabla a consultar el login
function login(formData, nombreTabla) {
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

    //obtener el usuario y la contraseña
    let { user, pass } = JSON.parse(formData);
    //variable para guardar la posicion del usuario
    let posicionUser = null;
    let posicionPass = null;
    let posicionEstado = null;
    //recorrer el arreglo de la primera posicion de la tabla para buscar el campo user
    arregloPrimeraFilaBaseDeDatos.map((el, index) => {
      //si al recorrer la primera fila el campo es user entonces guardar la posicion del user
      if (el == "user") {
        posicionUser = index;
      }

      //si al recorrer la primera fila el campo es user entonces guardar la posicion del pass
      if (el == "pass") {
        posicionPass = index;
      }

      //si al recorrer la primera fila el estado entonces guardar la posicion del estado
      if (el == "estado") {
        posicionEstado = index;
      }
    });

    //si la posicion User es diferente de nulo y la posicion del Pass es diferente de null
    //si la posicion del estado es diferente de null
    //significa que en la tabla en la primera fila existe el campo user y pass,
    // y quedo almacenada su posicion
    if (
      posicionUser != null &&
      posicionPass != null &&
      posicionEstado != null
    ) {
      //omitir la primera fila del arreglo de arreglos
      dataSheetHoja.shift();

      //si el elemento en la posicion del usuario es igual al user que viene desde el formulario
      //y si el elemento en la posicion del Pass es igual al pass que viene desde el formulario
      //encuentra coincidencia retorna un arreglo [] si no encuentra retorna undefined
      let arrayBusqueda = dataSheetHoja.find(
        (el) =>
          el[posicionUser] == user &&
          el[posicionPass] == pass &&
          el[posicionEstado] == "activo"
      );

      //@return {Array} arrayBusqueda: es el arreglo del registro que retorna cuando encuentra coincidencia de logueo
      //puede retornar undefined si no lo encuentra y si lo encuentra retorna el registro
      return JSON.stringify(arrayBusqueda);
    } else {
      //en caso contrario dejar este mensaje para el desarrollador para añadir el campo user y pass en la tabla
      console.log(
        "EL CAMPO user o pass no existe en la primera fila de la tabla añadirla porfavor"
      );
    }

    // let registroEncontrado = dataSheetHoja.find((el) => el[posicionId] == id);
    // return JSON.stringify("success");
  } catch (error) {
    console.log(error);
    //@return {Json Stringify} error: se retorna success si todo es correcto
    //si hay un error
    return JSON.stringify("error");
  }
}
