// Importa useNavigate desde React Router. Sirve para cambiar de página (navegar) desde código JavaScript.
import { useNavigate } from "react-router-dom";

// Importa useEffect, un hook de React que se usa para ejecutar algo después de que el componente se ha montado
import { useEffect } from "react";

// Define el componente funcional llamado Inicio
function Inicio() {
  // useNavigate nos da una función para redirigir al usuario a otra página sin recargar el navegador
  const navigate = useNavigate();

  // useEffect se ejecuta una vez, justo después de que el componente aparece en pantalla
  useEffect(() => {
    // Busca en el almacenamiento local del navegador si ya hay un rol guardado
    const rolGuardado = localStorage.getItem("rol");

    // Si hay un rol guardado, significa que el usuario ya eligió un rol antes
    // En ese caso, lo redirigimos directamente al dashboard
    if (rolGuardado) {
      navigate("/dashboard"); // Redirige a la página del dashboard
    }
  }, [navigate]); // Dependencias: se asegura que navigate esté disponible y actualizado

  // Esta función se ejecuta cuando el usuario hace clic en uno de los botones (Analista o Invitado)
  const seleccionarRol = (rol) => {
    // Guarda el rol seleccionado ("analista" o "invitado") en el almacenamiento del navegador
    localStorage.setItem("rol", rol);

    // Redirige manualmente al dashboard recargando la página
    // Esto fuerza que toda la app se reinicialice y se aplique correctamente el rol
    window.location.href = "/dashboard";
  };

  // Esto es lo que se muestra en la pantalla
  return (
    <div className="container mt-5">
      <div className="text-center">
        {/* Título principal */}
        <h1 className="mb-4">Bienvenido al Sistema INKA</h1>

        {/* Subtítulo indicando que el usuario debe elegir un rol */}
        <p className="lead">Selecciona tu rol para continuar:</p>

        {/* Contenedor con dos botones: uno para Analista y otro para Invitado */}
        <div className="d-flex justify-content-center gap-4 mt-4">
          
          {/* Botón para seleccionar el rol "analista". Al hacer clic se ejecuta la función seleccionarRol */}
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={() => seleccionarRol("analista")}
          >
            Analista
          </button>

          {/* Botón para seleccionar el rol "invitado" */}
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

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación (por ejemplo, en App.jsx)
export default Inicio;

