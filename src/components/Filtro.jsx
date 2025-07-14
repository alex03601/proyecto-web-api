function Filtro({ label, opciones, valor, onChange }) {
  return (
    <>
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todos</option>
        {opciones.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </>
  );
}

export default Filtro;
