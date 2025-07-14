import { useEffect } from "react";
import Evidencias from "./Evidencias";

function ModalDetalle({
  data,
  evidencias,
  onCerrar,
  rol,
  actualizarEvidencias,
}) {
  const {
    id,
    nombre,
    tipo,
    nivelRiesgo,
    fechaDescubrimiento,
    estado,
    descripcion,
    soluciones,
    recomendacionesCortoPlazo,
  } = data;

  useEffect(() => {
    const cerrarConEscape = (e) => {
      if (e.key === "Escape") onCerrar();
    };
    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [onCerrar]);

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.7)" }}
      tabIndex={-1}
      onClick={onCerrar}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border border-primary shadow">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">{nombre}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCerrar}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Tipo:</strong> {tipo}
            </p>
            <p>
              <strong>Nivel de Riesgo:</strong> {nivelRiesgo}
            </p>
            <p>
              <strong>Fecha:</strong> {fechaDescubrimiento}
            </p>
            <p>
              <strong>Estado:</strong> {estado}
            </p>
            <hr />
            <p>
              <strong>Descripción:</strong>
            </p>
            <p>{descripcion}</p>
            <p>
              <strong>Soluciones:</strong>
            </p>
            <p>{soluciones}</p>
            <p>
              <strong>Recomendaciones a Corto Plazo:</strong>
            </p>
            <p>{recomendacionesCortoPlazo}</p>

            {rol === "analista" && (
              <>
                <hr />
                <Evidencias
                  evidencias={evidencias}
                  setEvidencias={(nuevas) => actualizarEvidencias(id, nuevas)}
                />
              </>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCerrar}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetalle;
