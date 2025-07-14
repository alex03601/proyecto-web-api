import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Inicio from "./pages/Inicio";
import Dashboard from "./pages/Dashboard";

function App() {
  const [rol, setRol] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const guardado = localStorage.getItem("rol");
    setRol(guardado);
    setCargando(false);
  }, []);

  if (cargando) return null;

  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route
        path="/dashboard"
        element={rol ? <Dashboard rol={rol} /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
