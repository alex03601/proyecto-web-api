// Importa useEffect y useState, que son "hooks" de React para manejar estado y efectos secundarios
import { useEffect, useState } from "react";

// Importa componentes que se usarán dentro del dashboard
import TarjetaVulnerabilidad from "../components/TarjetaVulnerabilidad";
import Filtro from "../components/Filtro";
import ModalDetalle from "../components/ModalDetalle";
import FormularioCRUD from "../components/FormularioCRUD";

// Define un componente funcional llamado Dashboard que recibe una propiedad (prop) llamada "rol"
function Dashboard({ rol }) {
  // Define estados (variables con memoria) usando useState
  const [vulnerabilidades, setVulnerabilidades] = useState([]); // Lista principal de vulnerabilidades
  const [nivelFiltro, setNivelFiltro] = useState(""); // Filtro por nivel de riesgo
  const [tipoFiltro, setTipoFiltro] = useState(""); // Filtro por tipo de vulnerabilidad
  const [fechaFiltro, setFechaFiltro] = useState(""); // Filtro por fecha
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null); // Objeto que se mostrará en el modal de detalle
  const [formularioVisible, setFormularioVisible] = useState(false); // Booleano para mostrar/ocultar el formulario
  const [modoFormulario, setModoFormulario] = useState("crear"); // "crear" o "editar"
  const [vulnEnEdicion, setVulnEnEdicion] = useState(null); // Vulnerabilidad actual que se está editando

  // Hook que se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // Carga el archivo local de vulnerabilidades
    fetch("/vulnerabilidades.json")
      .then((res) => res.json()) // Convierte la respuesta en JSON (objeto de JS)
      .then((data) => setVulnerabilidades(data)); // Guarda los datos en el estado
  }, []);

  // Aplica los filtros sobre la lista de vulnerabilidades
  const filtradas = vulnerabilidades.filter((v) => {
    const cumpleEstado = rol === "analista" ? true : v.estado === "Vigente"; // Invitado solo ve las vigentes
    const coincideNivel = nivelFiltro ? v.nivelRiesgo === nivelFiltro : true; // Filtro por nivel si está activo
    const coincideTipo = tipoFiltro ? v.tipo === tipoFiltro : true; // Filtro por tipo si está activo
    const coincideFecha = fechaFiltro ? v.fechaDescubrimiento === fechaFiltro : true; // Filtro por fecha si está activo
    return cumpleEstado && coincideNivel && coincideTipo && coincideFecha; // Solo devuelve las que cumplen todo
  });

  // Extrae tipos únicos de vulnerabilidad para usarlos como opciones en el filtro
  const tiposUnicos = [...new Set(vulnerabilidades.map((v) => v.tipo))];

  // Muestra el formulario vacío para crear una nueva vulnerabilidad
  const mostrarFormularioCrear = () => {
    setModoFormulario("crear");
    setVulnEnEdicion(null);
    setFormularioVisible(true);
  };

  // Carga los datos de una vulnerabilidad existente en el formulario para editarla
  const mostrarFormularioEditar = (vuln) => {
    setModoFormulario("editar");
    setVulnEnEdicion(vuln);
    setFormularioVisible(true);
  };

  // Guarda una nueva vulnerabilidad o actualiza una existente
  const guardarVulnerabilidad = (vuln) => {
    if (modoFormulario === "crear") {
      const nuevo = { ...vuln, id: Date.now().toString() }; // Genera ID único con timestamp
      setVulnerabilidades([...vulnerabilidades, nuevo]); // Agrega la nueva
    } else {
      const actualizadas = vulnerabilidades.map((v) =>
        v.id === vuln.id ? vuln : v // Reemplaza la que coincide por ID
      );
      setVulnerabilidades(actualizadas);
    }
    setFormularioVisible(false); // Oculta el formulario
  };

  // Elimina una vulnerabilidad tras confirmar con el usuario
  const eliminarVulnerabilidad = (id) => {
    if (confirm("¿Estás seguro de eliminar esta vulnerabilidad?")) {
      setVulnerabilidades(vulnerabilidades.filter((v) => v.id !== id));
    }
  };

  // Renderiza la interfaz
  return (
    <div className="container mt-5">
      {/* Encabezado con título y botón de cierre de sesión */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Proyecto INKA – Dashboard</h1>
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => {
            localStorage.removeItem("rol"); // Borra el rol del navegador
            window.location.href = "/"; // Redirige a la pantalla de inicio
          }}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Mensaje informativo según el rol */}
      <div className="mb-3">
        {rol === "analista" && (
          <div className="alert alert-info">
            Acceso como <strong>Analista</strong>: puedes ver, crear, editar y
            eliminar vulnerabilidades.
          </div>
        )}
        {rol === "invitado" && (
          <div className="alert alert-secondary">
            Acceso como <strong>Invitado</strong>: solo se muestran
            vulnerabilidades vigentes.
          </div>
        )}
      </div>

      {/* Botón para crear nueva vulnerabilidad (solo para analistas) */}
      {rol === "analista" && (
        <div className="mb-4">
          <button className="btn btn-success" onClick={mostrarFormularioCrear}>
            + Nueva Vulnerabilidad
          </button>
        </div>
      )}

      {/* Filtros por nivel, tipo y fecha */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <Filtro
            label="Nivel de Riesgo"
            opciones={["Crítico", "Alto", "Medio", "Bajo"]}
            valor={nivelFiltro}
            onChange={setNivelFiltro}
          />
        </div>
        <div className="col-md-4">
          <Filtro
            label="Tipo de Vulnerabilidad"
            opciones={tiposUnicos}
            valor={tipoFiltro}
            onChange={setTipoFiltro}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Fecha de Descubrimiento</label>
          <input
            type="date"
            className="form-control"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
          />
        </div>
      </div>

      {/* Muestra las tarjetas o un mensaje si no hay resultados */}
      <div className="row">
        {filtradas.length === 0 ? (
          <p>No hay vulnerabilidades que coincidan con los filtros.</p>
        ) : (
          filtradas.map((v) => (
            <div className="col-md-6 mb-4" key={v.id}>
              <TarjetaVulnerabilidad
                data={v} // Pasa los datos de cada vulnerabilidad
                onVerDetalle={() => setDetalleSeleccionado(v)} // Abre modal al hacer clic en "Ver detalle"
                onEditar={
                  rol === "analista" ? () => mostrarFormularioEditar(v) : null
                } // Permite editar solo si es analista
                onEliminar={
                  rol === "analista" ? () => eliminarVulnerabilidad(v.id) : null
                } // Permite eliminar solo si es analista
              />
            </div>
          ))
        )}
      </div>

      {/* Modal con los detalles de una vulnerabilidad */}
      {detalleSeleccionado && (
        <ModalDetalle
          data={detalleSeleccionado}
          onCerrar={() => setDetalleSeleccionado(null)}
        />
      )}

      {/* Formulario para crear o editar una vulnerabilidad */}
      {formularioVisible && (
        <FormularioCRUD
          modo={modoFormulario}
          inicial={vulnEnEdicion}
          onGuardar={guardarVulnerabilidad}
          onCancelar={() => setFormularioVisible(false)}
        />
      )}
    </div>
  );
}

// Exporta el componente para que pueda usarse en otros archivos
export default Dashboard;
