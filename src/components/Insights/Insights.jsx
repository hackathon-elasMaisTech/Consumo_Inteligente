import styles from "./Insights.module.css";
import { GoLightBulb } from "react-icons/go";



function Insights({ analise }) {
  if (!analise) {
    return <p>Carregando insights...</p>;
  }

  return (    
      <aside  className={styles.insightsCard}>
        <h3>Insights</h3>

          {analise.insights.map((item) => (
            <article  className={styles.insightItem} key={item.titulo}>
              <div className={styles.iconContainer}>
                <GoLightBulb />
              </div>


              <div className={styles.textContent}>
                <h4>{item.titulo}</h4>

                <strong>{item.valor}</strong>

                <p>{item.descricao}</p>
              </div>
              
            </article>
      ))}
          </aside>
);
}

export default Insights;
