import { useState, useEffect } from "react";
import Evidencias from "./Evidencias"; // Asegúrate de ajustar la ruta según tu estructura

function FormularioCRUD({ modo, inicial, onGuardar, onCancelar }) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    tipo: "",
    nivelRiesgo: "",
    fechaDescubrimiento: "",
    descripcion: "",
    soluciones: "",
    recomendacionesCortoPlazo: "",
    estado: "Vigente",
  });

  const [evidencias, setEvidencias] = useState([]);

  useEffect(() => {
    if (inicial) {
      setFormulario(inicial);
      if (inicial.evidencias) {
        setEvidencias(inicial.evidencias);
      }
    }
  }, [inicial]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!formulario.nombre || !formulario.tipo || !formulario.nivelRiesgo)
      return;

    const datosCompletos = {
      ...formulario,
      evidencias,
    };

    onGuardar(datosCompletos);
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.7)" }}
      tabIndex={-1}
      onClick={onCancelar}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border shadow">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              {modo === "editar"
                ? "Editar Vulnerabilidad"
                : "Nueva Vulnerabilidad"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancelar}
            ></button>
          </div>
          <form onSubmit={manejarSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                {/* Campos del formulario */}
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

              {/* Aquí se agrega el componente de Evidencias */}
              <Evidencias evidencias={evidencias} setEvidencias={setEvidencias} />
            </div>

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
