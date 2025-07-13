// Componente que representa una tarjeta visual para mostrar datos resumidos de una vulnerabilidad
// Props:
// - data: objeto con la información de la vulnerabilidad
// - onVerDetalle: función a ejecutar al presionar "Ver Detalle"
// - onEditar: función a ejecutar al presionar "Editar" (opcional)
// - onEliminar: función a ejecutar al presionar "Eliminar" (opcional)
function TarjetaVulnerabilidad({ data, onVerDetalle, onEditar, onEliminar }) {
  // Extraemos los campos necesarios del objeto data
  const { nombre, tipo, nivelRiesgo, fechaDescubrimiento, estado } = data;

  return (
    // Contenedor visual de la tarjeta con borde oscuro y sombra
    <div className="card border-dark h-100 shadow-sm">
      {/* Contenido principal de la tarjeta, usando flex para distribuir botones al final */}
      <div className="card-body d-flex flex-column">
        {/* Título: nombre de la vulnerabilidad */}
        <h5 className="card-title">{nombre}</h5>

        {/* Información principal en texto con margen inferior */}
        <p className="card-text mb-4">
          <strong>Tipo:</strong> {tipo} <br />
          <strong>Riesgo:</strong> {nivelRiesgo} <br />
          <strong>Fecha:</strong> {fechaDescubrimiento} <br />
          <strong>Estado:</strong> {estado}
        </p>

        {/* Botones alineados al final de la tarjeta con espacio entre ellos */}
        <div className="mt-auto d-flex justify-content-end gap-2">
          {/* Botón siempre visible para ver el detalle */}
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={onVerDetalle}
          >
            Ver Detalle
          </button>

          {/* Solo mostramos el botón de editar si se pasó la prop onEditar */}
          {onEditar && (
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={onEditar}
            >
              Editar
            </button>
          )}

          {/* Solo mostramos el botón de eliminar si se pasó la prop onEliminar */}
          {onEliminar && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={onEliminar}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TarjetaVulnerabilidad;
