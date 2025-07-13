import { useState, useEffect } from "react"; // Importamos hooks de React: useState para manejar el estado, y useEffect para ejecutar código cuando el componente se monta o cambia.

// Este componente permite crear o editar vulnerabilidades.
// Recibe como props:
// - modo: "crear" o "editar" (determina el título del formulario y el botón principal)
// - inicial: objeto con datos si se está editando una vulnerabilidad
// - onGuardar: función que se llama al enviar el formulario
// - onCancelar: función que se llama si el usuario cancela
function FormularioCRUD({ modo, inicial, onGuardar, onCancelar }) {
  // Estado que contiene los valores del formulario
  const [formulario, setFormulario] = useState({
    nombre: "",
    tipo: "",
    nivelRiesgo: "",
    fechaDescubrimiento: "",
    descripcion: "",
    soluciones: "",
    recomendacionesCortoPlazo: "",
    estado: "Vigente", // por defecto
  });

  // Si se recibe un objeto 'inicial' (modo editar), rellenamos el formulario con sus datos
  useEffect(() => {
    if (inicial) {
      setFormulario(inicial);
    }
  }, [inicial]);

  // Maneja cambios en los campos del formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value }); // actualiza solo el campo que cambió
  };

  // Se ejecuta cuando el usuario envía el formulario
  const manejarSubmit = (e) => {
    e.preventDefault(); // evita que se recargue la página
    // Validación básica: nombre, tipo y nivel de riesgo son obligatorios
    if (!formulario.nombre || !formulario.tipo || !formulario.nivelRiesgo)
      return;
    onGuardar(formulario); // llama a la función que guarda los datos
  };

  return (
    // Este div simula un modal visible (aunque no estamos usando Bootstrap JS directamente)
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.7)" }} // oscurece el fondo
      tabIndex={-1}
      onClick={onCancelar} // si se hace clic fuera del formulario, se cancela
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()} // evita que el clic dentro del formulario cierre el modal
      >
        <div className="modal-content border shadow">
          {/* Cabecera del formulario con título dinámico */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              {modo === "editar"
                ? "Editar Vulnerabilidad"
                : "Nueva Vulnerabilidad"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancelar} // botón de cerrar
            ></button>
          </div>

          {/* Formulario principal */}
          <form onSubmit={manejarSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                {/* Campo: Nombre */}
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                {/* Campo: Tipo */}
                <div className="col-md-6">
                  <label className="form-label">Tipo</label>
                  <input
                    type="text"
                    name="tipo"
                    className="form-control"
                    value={formulario.tipo}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                {/* Campo: Nivel de Riesgo */}
                <div className="col-md-4">
                  <label className="form-label">Nivel de Riesgo</label>
                  <select
                    name="nivelRiesgo"
                    className="form-select"
                    value={formulario.nivelRiesgo}
                    onChange={manejarCambio}
                    required
                  >
                    <option value="">-- Seleccionar --</option>
                    <option value="Crítico">Crítico</option>
                    <option value="Alto">Alto</option>
                    <option value="Medio">Medio</option>
                    <option value="Bajo">Bajo</option>
                  </select>
                </div>

                {/* Campo: Estado (solo visible en edición) */}
                <div className="col-md-4">
                  <label className="form-label">Estado</label>
                  <select
                    name="estado"
                    className="form-select"
                    value={formulario.estado}
                    onChange={manejarCambio}
                  >
                    <option value="Vigente">Vigente</option>
                    <option value="Resuelta">Resuelta</option>
                  </select>
                </div>

                {/* Campo: Fecha de Descubrimiento */}
                <div className="col-md-4">
                  <label className="form-label">Fecha de Descubrimiento</label>
                  <input
                    type="date"
                    name="fechaDescubrimiento"
                    className="form-control"
                    value={formulario.fechaDescubrimiento}
                    onChange={manejarCambio}
                  />
                </div>

                {/* Campo: Descripción */}
                <div className="col-12">
                  <label className="form-label">Descripción</label>
                  <textarea
                    name="descripcion"
                    className="form-control"
                    rows="2"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                  />
                </div>

                {/* Campo: Soluciones */}
                <div className="col-12">
                  <label className="form-label">Soluciones</label>
                  <textarea
                    name="soluciones"
                    className="form-control"
                    rows="2"
                    value={formulario.soluciones}
                    onChange={manejarCambio}
                  />
                </div>

                {/* Campo: Recomendaciones a Corto Plazo */}
                <div className="col-12">
                  <label className="form-label">
                    Recomendaciones Corto Plazo
                  </label>
                  <textarea
                    name="recomendacionesCortoPlazo"
                    className="form-control"
                    rows="2"
                    value={formulario.recomendacionesCortoPlazo}
                    onChange={manejarCambio}
                  />
                </div>
              </div>
            </div>

            {/* Botones del formulario */}
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                {modo === "editar" ? "Guardar cambios" : "Crear"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancelar}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioCRUD;
