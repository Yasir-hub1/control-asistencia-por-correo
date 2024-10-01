import React, { useEffect, useState } from 'react';
import './App.css'; // Importar el archivo de estilos

export default function Admin() {
  const [registros, setRegistros] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [filtrados, setFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina] = useState(5); // Registros a mostrar por página

  useEffect(() => {
    const cargarRegistros = async () => {
      try {
        const response = await fetch('http://192.168.0.121:3002/api/registros'); // Cambia la URL según sea necesario
        const data = await response.json();
        setRegistros(data);
        setFiltrados(data); // Inicialmente, mostrar todos los registros
      } catch (error) {
        console.error('Error al cargar los registros:', error);
      }
    };

    cargarRegistros();
  }, []);

  const convertirFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getUTCFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const filtrarPorFecha = () => {
    if (fechaFiltro) {
      const fechaFormateada = convertirFecha(fechaFiltro);

      const registrosFiltrados = registros.filter(registro => {
        const fechaRegistro = registro.fecha.split(' ')[0]; // Tomar solo la parte de la fecha
        return fechaRegistro === fechaFormateada;
      });

      setFiltrados(registrosFiltrados);
    } else {
      setFiltrados(registros);
    }
    setPaginaActual(1); // Reiniciar a la primera página después del filtro
  };

  // Calcular los registros de la página actual
  const indiceUltimoRegistro = paginaActual * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;
  const registrosActuales = filtrados.slice(indicePrimerRegistro, indiceUltimoRegistro);

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  const numeroDePaginas = Math.ceil(filtrados.length / registrosPorPagina);

  return (
    <div className="admin-container">
      <h3>Admin</h3>
      <input
        type="date"
        value={fechaFiltro}
        onChange={(e) => setFechaFiltro(e.target.value)}
        placeholder="Filtrar por fecha"
        className="input-fecha"
      />
      <button onClick={filtrarPorFecha} className="btn-filtrar">Filtrar</button>

      <table className="tabla-registros">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {registrosActuales.length > 0 ? (
            registrosActuales.map((registro, index) => (
              <tr key={index}>
                <td>{registro.tipo}</td>
                <td>{registro.fecha}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No se encontraron registros.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="paginacion">
        {Array.from({ length: numeroDePaginas }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => cambiarPagina(index + 1)}
            className={`btn-pagina ${paginaActual === index + 1 ? 'activo' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
