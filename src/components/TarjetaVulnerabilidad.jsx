function TarjetaVulnerabilidad({ data, onVerDetalle, onEditar, onEliminar }) {
  const { nombre, tipo, nivelRiesgo, fechaDescubrimiento, estado } = data;

  return (
    <div className="card border-dark h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text mb-4">
          <strong>Tipo:</strong> {tipo} <br />
          <strong>Riesgo:</strong> {nivelRiesgo} <br />
          <strong>Fecha:</strong> {fechaDescubrimiento} <br />
          <strong>Estado:</strong> {estado}
        </p>

        <div className="mt-auto d-flex justify-content-end gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={onVerDetalle}
          >
            Ver Detalle
          </button>

          {onEditar && (
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={onEditar}
            >
              Editar
            </button>
          )}

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
