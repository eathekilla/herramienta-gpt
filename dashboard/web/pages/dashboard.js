// pages/dashboard.js

import { useState, useEffect } from 'react';
import styles from '../styles/Dashboard.module.css'; // Crearemos este archivo para los estilos

export default function DashboardPage() {
  // Estado para guardar la lista de experimentos
  const [experimentos, setExperimentos] = useState([]);
  // Estado para el campo de búsqueda
  const [empresa, setEmpresa] = useState('');
  // Estado para manejar los mensajes de carga y error
  const [statusMessage, setStatusMessage] = useState('Ingresa un nombre de empresa para buscar...');

  // Función para buscar los experimentos
  const buscarExperimentos = async (nombreEmpresa) => {
    setStatusMessage('Buscando...');
    setExperimentos([]); // Limpia resultados anteriores

    // ¡IMPORTANTE! Reemplaza con la URL de tu API en Vercel
    const apiUrl = 'https://<tu-proyecto>.vercel.app/api/buscarExperimentos';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreEmpresa }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.experimentos && result.experimentos.length > 0) {
          setExperimentos(result.experimentos);
          setStatusMessage(''); // Limpia el mensaje si hay resultados
        } else {
          setStatusMessage('No se encontraron experimentos para esa empresa.');
        }
      } else {
        throw new Error(result.error || 'Ocurrió un error en el servidor.');
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  // Maneja el envío del formulario de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (empresa.trim() !== '') {
      buscarExperimentos(empresa);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Dashboard de Experimentos</h1>
      
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          placeholder="Buscar por nombre de empresa"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Buscar</button>
      </form>

      {statusMessage && <p className={styles.statusMessage}>{statusMessage}</p>}

      {experimentos.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre del Experimento</th>
              <th>Empresa</th>
              <th>Estado</th>
              <th>Fecha de Inicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {experimentos.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.nombre_experimento}</td>
                <td>{exp.empresa}</td>
                <td><span className={`${styles.status} ${exp.estado === 'Finalizado' ? styles.finalizado : styles.definido}`}>{exp.estado}</span></td>
                <td>{exp.fecha_inicio}</td>
                <td>
                  <button className={styles.actionButton}>Ver Detalles</button>
                  <button className={styles.actionButton}>Registrar Resultado</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}