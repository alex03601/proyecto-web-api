// Define un componente funcional llamado "Filtro"
// Recibe 4 props:
// - label: el texto que se mostrará como etiqueta del filtro
// - opciones: un arreglo con las opciones a mostrar en el select
// - valor: el valor actualmente seleccionado
// - onChange: una función que se llama cuando el usuario selecciona una nueva opción

function Filtro({ label, opciones, valor, onChange }) {
  return (
    <>
      {/* Muestra la etiqueta del filtro */}
      <label className="form-label">{label}</label>

      {/* Campo desplegable (select) que permite elegir una opción */}
      <select
        className="form-select"       // Clase de Bootstrap para estilos
        value={valor}                 // El valor actualmente seleccionado
        onChange={(e) => onChange(e.target.value)} // Cuando cambia, se llama a la función onChange con el nuevo valor
      >
        {/* Opción por defecto que representa "no filtrar" */}
        <option value="">Todos</option>

        {/* Genera dinámicamente una opción por cada elemento en el arreglo "opciones" */}
        {opciones.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </>
  );
}

// Exporta el componente para que pueda ser usado en otros archivos
export default Filtro;
