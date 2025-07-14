import { useEffect, useState } from "react";
import TarjetaVulnerabilidad from "../components/TarjetaVulnerabilidad";
import Filtro from "../components/Filtro";
import ModalDetalle from "../components/ModalDetalle";
import FormularioCRUD from "../components/FormularioCRUD";

function Dashboard({ rol }) {
  const [vulnerabilidades, setVulnerabilidades] = useState([]);
  const [nivelFiltro, setNivelFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear");
  const [vulnEnEdicion, setVulnEnEdicion] = useState(null);

  useEffect(() => {
    fetch("/vulnerabilidades.json")
      .then((res) => res.json())
      .then((data) => setVulnerabilidades(data));
  }, []);

  // 🔄 Sincronizar detalleSeleccionado con vulnerabilidades actualizadas
  useEffect(() => {
    if (detalleSeleccionado) {
      const actualizado = vulnerabilidades.find(
        (v) => v.id === detalleSeleccionado.id
      );
      if (actualizado) {
        setDetalleSeleccionado(actualizado);
      }
    }
  }, [vulnerabilidades]);

  const filtradas = vulnerabilidades.filter((v) => {
    const cumpleEstado = rol === "analista" ? true : v.estado === "Vigente";
    const coincideNivel = nivelFiltro ? v.nivelRiesgo === nivelFiltro : true;
    const coincideTipo = tipoFiltro ? v.tipo === tipoFiltro : true;
    const coincideFecha = fechaFiltro
      ? v.fechaDescubrimiento === fechaFiltro
      : true;
    return cumpleEstado && coincideNivel && coincideTipo && coincideFecha;
  });

  const tiposUnicos = [...new Set(vulnerabilidades.map((v) => v.tipo))];

  const mostrarFormularioCrear = () => {
    setModoFormulario("crear");
    setVulnEnEdicion(null);
    setFormularioVisible(true);
  };

  const mostrarFormularioEditar = (vuln) => {
    setModoFormulario("editar");
    setVulnEnEdicion(vuln);
    setFormularioVisible(true);
  };

  const guardarVulnerabilidad = (vuln) => {
    if (modoFormulario === "crear") {
      const nuevo = { ...vuln, id: Date.now().toString() };
      setVulnerabilidades([...vulnerabilidades, nuevo]);
    } else {
      const actualizadas = vulnerabilidades.map((v) =>
        v.id === vuln.id ? vuln : v
      );
      setVulnerabilidades(actualizadas);
    }
    setFormularioVisible(false);
  };

  const eliminarVulnerabilidad = (id) => {
    if (confirm("¿Estás seguro de eliminar esta vulnerabilidad?")) {
      setVulnerabilidades(vulnerabilidades.filter((v) => v.id !== id));
    }
  };

  const actualizarEvidencias = (id, nuevasEvidencias) => {
    const actualizadas = vulnerabilidades.map((v) =>
      v.id === id ? { ...v, evidencias: nuevasEvidencias } : v
    );
    setVulnerabilidades(actualizadas);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Proyecto INKA – Dashboard</h1>
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => {
            localStorage.removeItem("rol");
            window.location.href = "/";
          }}
        >
          Cerrar sesión
        </button>
      </div>

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

      {rol === "analista" && (
        <div className="mb-4">
          <button className="btn btn-success" onClick={mostrarFormularioCrear}>
            + Nueva Vulnerabilidad
          </button>
        </div>
      )}

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

      <div className="row">
        {filtradas.length === 0 ? (
          <p>No hay vulnerabilidades que coincidan con los filtros.</p>
        ) : (
          filtradas.map((v) => (
            <div className="col-md-6 mb-4" key={v.id}>
              <TarjetaVulnerabilidad
                data={v}
                onVerDetalle={() => setDetalleSeleccionado(v)}
                onEditar={
                  rol === "analista" ? () => mostrarFormularioEditar(v) : null
                }
                onEliminar={
                  rol === "analista" ? () => eliminarVulnerabilidad(v.id) : null
                }
              />
            </div>
          ))
        )}
      </div>

      {detalleSeleccionado && (
        <ModalDetalle
          data={detalleSeleccionado}
          evidencias={detalleSeleccionado.evidencias || []}
          onCerrar={() => setDetalleSeleccionado(null)}
          rol={rol}
          actualizarEvidencias={actualizarEvidencias}
        />
      )}

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

export default Dashboard;
