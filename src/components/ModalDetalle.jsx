import { useEffect } from "react"; // Importamos useEffect para manejar efectos secundarios (como cerrar con ESC)

// Componente que muestra un modal de solo lectura con los detalles de una vulnerabilidad
// Props:
// - data: objeto con los datos de la vulnerabilidad seleccionada
// - onCerrar: función para cerrar el modal
function ModalDetalle({ data, onCerrar }) {
  // Extraemos los campos del objeto data mediante desestructuración
  const {
    nombre,
    tipo,
    nivelRiesgo,
    fechaDescubrimiento,
    estado,
    descripcion,
    soluciones,
    recomendacionesCortoPlazo,
  } = data;

  // Efecto: cerrar el modal si el usuario presiona la tecla Escape
  useEffect(() => {
    const cerrarConEscape = (e) => {
      if (e.key === "Escape") onCerrar();
    };

    // Agregamos el listener cuando se monta el componente
    document.addEventListener("keydown", cerrarConEscape);

    // Lo quitamos al desmontar para evitar fugas de memoria
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [onCerrar]);

  return (
    // Modal con fondo oscuro. Al hacer clic fuera del contenido, se cierra
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.7)" }}
      tabIndex={-1}
      onClick={onCerrar}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()} // Previene que el clic dentro del modal cierre el fondo
      >
        <div className="modal-content border border-primary shadow">
          {/* Cabecera con el nombre de la vulnerabilidad */}
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">{nombre}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCerrar}
            ></button>
          </div>

          {/* Cuerpo del modal con los detalles */}
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

            <hr /> {/* Separador visual */}

            {/* Secciones de texto más largas */}
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
          </div>

          {/* Pie con botón de cierre */}
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
