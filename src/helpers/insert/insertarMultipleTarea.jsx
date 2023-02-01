// Guardar los datos del registro de historias y subtareas
// @param {Object} dataForm: info proveniente del formulario de historias y subtareas
// @param {Array[Object]} subtask:lista de las subtareas o funcionalidades

insertarMultipleTarea = async (dataForm, subtask) => {
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
      .saveStory(dataForm, subtask);
  });

  let respuesta = await promesa;
  //@return respuesta
  return respuesta;
};

export default insertarMultipleTarea;
