import styles from "./VisaoConsumo.module.css";

function VisaoConsumo({ analise }) {
    if (!analise) {
        return <p>Carregando... </p>;
  }

    return(

        <section className={styles.insightsContainer}>
            <h2 className={styles.title}>Visao de Consumo</h2>

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
          </div>
          </section>     
    )
}

export default VisaoConsumo;