import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Inicio() {
  const navigate = useNavigate();

  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    if (rolGuardado) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const seleccionarRol = (rol) => {
    localStorage.setItem("rol", rol);
    window.location.href = "/dashboard";
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4">Bienvenido al Sistema INKA</h1>
        <p className="lead">Selecciona tu rol para continuar:</p>

        <div className="d-flex justify-content-center gap-4 mt-4">
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={() => seleccionarRol("analista")}
          >
            Analista
          </button>
          <button
            className="btn btn-outline-secondary btn-lg"
            onClick={() => seleccionarRol("invitado")}
          >
            Invitado
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
