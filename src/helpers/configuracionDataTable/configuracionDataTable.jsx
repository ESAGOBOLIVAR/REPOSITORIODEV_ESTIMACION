//configuracion del dataTable para paramatrizar paginacion e idiomas
const configuracionDataTable = {
  // se define las propiedades del lenguaje que se muestra en la tabla
  language: {
    processing: "Tratamiento en curso...",
    search: "Buscar",
    lengthMenu: "Agrupar de a _MENU_ registros",
    info: "Mostrando desde el _START_ al _END_ de un total de _TOTAL_ registros",
    infoEmpty: "No existen datos.",
    infoFiltered: "(filtrado de _MAX_ elementos en total)",
    infoPostFix: "",
    loadingRecords: "Cargando...",
    zeroRecords: "No se encontraron datos con tu búsqueda",
    emptyTable: "No hay datos disponibles en la tabla.",
    paginate: {
      first: "Primero",
      previous: "Anterior",
      next: "Siguiente",
      last: "Ultimo",
    },
    aria: {
      sortAscending: ": active para ordenar la columna en orden ascendente",
      sortDescending: ": active para ordenar la columna en orden descendente",
    },
  },
};

export default configuracionDataTable;
