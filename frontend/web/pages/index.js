import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Herramienta de Gestión de Experimentos</h1>
      <div className={styles.links}>
        <Link href="/crear" className={styles.linkCard}>
          <h2>Crear Experimento &rarr;</h2>
          <p>Llena un formulario para definir un nuevo experimento.</p>
        </Link>
        <Link href="/dashboard" className={styles.linkCard}>
          <h2>Ver Dashboard &rarr;</h2>
          <p>Busca y visualiza todos los experimentos guardados.</p>
        </Link>
      </div>
    </div>
  );
}