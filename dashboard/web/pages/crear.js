// pages/crear.js

import { useState } from 'react';
import styles from '../styles/Crear.module.css'; // Crearemos este archivo para los estilos

export default function CrearExperimentoPage() {
  // Estado para guardar todos los datos del formulario
  const [formData, setFormData] = useState({
    empresa: '',
    nombre_experimento: '',
    hipotesis: '',
    contexto_observaciones: '',
    metrica_principal: '',
    // ... puedes añadir aquí los demás campos si lo deseas
  });

  // Estado para manejar los mensajes de carga y error
  const [statusMessage, setStatusMessage] = useState('');

  // Función que se ejecuta cada vez que el usuario escribe en un campo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setStatusMessage('Guardando experimento...');

    // ¡IMPORTANTE! Reemplaza con la URL de tu API en Vercel
    const apiUrl = 'https://<tu-proyecto>.vercel.app/api/guardarExperimento';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage(`¡Éxito! Experimento guardado con ID: ${result.id}`);
        // Opcional: limpiar el formulario después de guardar
        setFormData({
            empresa: '',
            nombre_experimento: '',
            hipotesis: '',
            contexto_observaciones: '',
            metrica_principal: '',
        });
      } else {
        // Si el servidor responde con un error (ej: 400, 500)
        throw new Error(result.error || 'Ocurrió un error en el servidor.');
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Crear Nuevo Experimento</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <label htmlFor="empresa">Empresa</label>
        <input
          type="text"
          id="empresa"
          name="empresa"
          value={formData.empresa}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="nombre_experimento">Nombre del Experimento</label>
        <input
          type="text"
          id="nombre_experimento"
          name="nombre_experimento"
          value={formData.nombre_experimento}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="hipotesis">Hipótesis</label>
        <textarea
          id="hipotesis"
          name="hipotesis"
          value={formData.hipotesis}
          onChange={handleInputChange}
          required
          rows="4"
        />

        <label htmlFor="contexto_observaciones">Contexto y Observaciones</label>
        <textarea
          id="contexto_observaciones"
          name="contexto_observaciones"
          value={formData.contexto_observaciones}
          onChange={handleInputChange}
          rows="3"
        />
        
        <label htmlFor="metrica_principal">Métrica Principal (KPI)</label>
        <input
          type="text"
          id="metrica_principal"
          name="metrica_principal"
          value={formData.metrica_principal}
          onChange={handleInputChange}
        />

        <button type="submit" className={styles.submitButton}>Guardar Experimento</button>
      </form>
      {statusMessage && <p className={styles.statusMessage}>{statusMessage}</p>}
    </div>
  );
}