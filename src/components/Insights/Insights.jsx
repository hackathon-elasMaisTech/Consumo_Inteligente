import styles from "./Insights.module.css";


function Insights({ analise }) {
  const insight = analise.insightCategoriaDominante;

  return (
    <section className={styles.insightsContainer}>
      <h2 className={styles.title}>Visao de Consumo</h2>

      {!insight ? (
        <p>Nenhum insight disponivel ainda.</p>
      ) : (
        <div className={styles.content}>
          <section className={styles.categorias}>
            <h3>Categorias de consumo</h3>

            {analise.categoriasConsumo.map((categoria) => (
              <div className={styles.categoriaItem} key={categoria.categoria}>
                <div className={styles.categoriaHeader}>
                  <strong>{categoria.categoria}</strong>
                  <span> R$ {categoria.valor.toFixed(2)}</span>
                  <span> {categoria.percentual}%</span>
                </div>

                <progress className={styles.progress} value={categoria.percentual} max="100">
                  {categoria.percentual}%
                </progress>
              </div>
            ))}
          </section>

          <aside  className={styles.insightsCard}>
            <h3>Insights</h3>

            {analise.insights.map((item) => (
              <article  className={styles.insightItem} key={item.titulo}>
                <h4>{item.titulo}</h4>
                <strong>{item.valor}</strong>
                <p>{item.descricao}</p>
              </article>
            ))}
          </aside>

          
        </div>
      )}
    </section>
  );
}

export default Insights;
