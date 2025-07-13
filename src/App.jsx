// Importa componentes del sistema de rutas de React
// Routes: agrupa todas las rutas posibles
// Route: define una ruta individual (por ejemplo, /dashboard)
// Navigate: permite redirigir al usuario a otra ruta (como si fuera un "redirigir")
import { Routes, Route, Navigate } from "react-router-dom";

// Importa dos hooks de React:
// useEffect: sirve para ejecutar algo después de que el componente se ha mostrado en pantalla
// useState: permite guardar y modificar información (estado) dentro del componente
import { useEffect, useState } from "react";

// Importa el componente de la página de inicio (Inicio.jsx)
import Inicio from "./pages/Inicio";

// Importa el componente de la página del dashboard (Dashboard.jsx)
import Dashboard from "./pages/Dashboard";

// Este es el componente principal de tu aplicación
function App() {
  // Estado para guardar el "rol" del usuario (puede ser "analista", "invitado", o null si aún no se ha definido)
  const [rol, setRol] = useState(null);

  // Estado para saber si estamos cargando los datos (por ejemplo, leyendo desde localStorage)
  const [cargando, setCargando] = useState(true);

  // useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // Busca en el almacenamiento del navegador (localStorage) si ya hay un rol guardado
    const guardado = localStorage.getItem("rol");

    // Si encuentra uno, lo guarda en el estado
    setRol(guardado);

    // Marca que ya terminó de cargar (ya no está "cargando")
    setCargando(false);
  }, []); // Los corchetes vacíos hacen que esto se ejecute solo una vez (cuando la app se abre)

  // Mientras está en modo "cargando", no muestra nada en pantalla
  // Esto evita que se renderice algo antes de saber si hay un rol o no
  if (cargando) return null; // También podrías poner aquí un componente de carga (spinner, por ejemplo)

  // Este es el sistema de rutas que define qué mostrar según la URL
  return (
    <Routes>
      {/* Ruta principal (página de inicio). Se muestra cuando la URL es exactamente "/" */}
      <Route path="/" element={<Inicio />} />

      {/* Ruta para el dashboard. Solo se permite el acceso si existe un rol. */}
      {/* Si no hay rol (es null), redirige de nuevo a la página de inicio */}
      <Route
        path="/dashboard"
        element={rol ? <Dashboard rol={rol} /> : <Navigate to="/" replace />}
      />

      {/* Ruta comodín. Si el usuario escribe una ruta que no existe, lo redirige a "/" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Exporta el componente App para que pueda ser usado en index.jsx
export default App;
