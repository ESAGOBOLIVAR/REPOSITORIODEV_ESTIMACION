//@param {Array} dataForm: son los datos del formulario
insertar = async (dataForm, tabla) => {
  let promesa = new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler((el) => {
        //se parse la respuesta y se retorna
        //@return success: todo correcto
        //se retorna resolve si todo esta correcto
        resolve(JSON.parse(el));
      })
      .withFailureHandler((err) => {
        //se parse la respuesta y se retorna
        //@return error: hubo algun error
        //se retorna reject si hay algun error en la promesa
        reject(JSON.parse(err));
      })
      .insert(dataForm, tabla);
  });

  let respuesta = await promesa;
  //@return respuesta
  return respuesta;
};

export default insertar;
