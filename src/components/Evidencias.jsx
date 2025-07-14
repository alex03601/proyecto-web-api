function Evidencias({ evidencias, setEvidencias, soloLectura = false }) {
  const tiposPermitidos = ["application/pdf", "image/png", "image/jpeg"];

  const subirArchivo = (e) => {
    if (soloLectura) return;
    const archivo = e.target.files[0];
    if (!archivo) return;

    if (!tiposPermitidos.includes(archivo.type)) {
      alert("Formato no permitido. Solo PDF, PNG o JPG.");
      return;
    }

    const nuevaEvidencia = {
      id: Date.now(),
      nombre: archivo.name,
      tipo: archivo.type,
      principal: evidencias.length === 0,
    };

    setEvidencias([...evidencias, nuevaEvidencia]);
    e.target.value = null;
  };

  const marcarPrincipal = (id) => {
    if (soloLectura) return;
    const actualizadas = evidencias.map((e) => ({
      ...e,
      principal: e.id === id,
    }));
    setEvidencias(actualizadas);
  };

  const eliminarEvidencia = (id) => {
    if (soloLectura) return;
    const filtradas = evidencias.filter((e) => e.id !== id);
    setEvidencias(filtradas);
  };

  return (
    <div className="mt-4">
      <h5>Evidencias</h5>

      {!soloLectura && (
        <input
          type="file"
          onChange={subirArchivo}
          className="form-control mb-2"
        />
      )}

      {evidencias.length === 0 ? (
        <p>No hay evidencias subidas.</p>
      ) : (
        <ul className="list-group">
          {evidencias.map((e) => (
            <li
              key={e.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                {e.nombre} {e.principal && <strong>(Principal)</strong>}
              </span>
              {!soloLectura && (
                <div className="btn-group">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => marcarPrincipal(e.id)}
                  >
                    Marcar principal
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminarEvidencia(e.id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Evidencias;
