// Importa React, que es necesario para trabajar con JSX (una forma de escribir HTML dentro de JavaScript)
import React from "react";

// Importa ReactDOM, que permite mostrar componentes React en el navegador
import ReactDOM from "react-dom/client";

// Importa el componente principal de la aplicación, donde están las rutas y lógica general
import App from "./App.jsx";

// Importa BrowserRouter, que permite manejar rutas (URLs) en tu aplicación sin recargar la página
import { BrowserRouter } from "react-router-dom";

// Importa un archivo CSS personalizado para aplicar estilos a la aplicación
import "./styles/custom.css";

// Esta línea busca en el archivo HTML un elemento con id "root"
// Generalmente se encuentra en public/index.html con <div id="root"></div>
// React va a dibujar toda la aplicación dentro de ese div
ReactDOM.createRoot(document.getElementById("root")).render(
  
  // React.StrictMode es una herramienta de desarrollo que ayuda a detectar errores o prácticas no recomendadas
  // No afecta la versión final de la aplicación, solo te da advertencias en desarrollo
  <React.StrictMode>
    
    {/* BrowserRouter permite usar navegación por URL dentro de tu aplicación (como ir a /login o /dashboard) */}
    {/* Sin él, no podrías usar <Route> ni <Link> */}
    <BrowserRouter>
      
      {/* Aquí se muestra el componente principal de tu app. Es como el "cuerpo" de todo. */}
      {/* App normalmente contiene las rutas y los componentes más importantes */}
      <App />

    </BrowserRouter>

  </React.StrictMode>
);
