function Insights({ analise }) {
  const insight = analise.insightCategoriaDominante;

  return (
    <section>
      <h2>Visao de Consumo</h2>

      {!insight ? (
        <p>Nenhum insight disponivel ainda.</p>
      ) : (
        <div>
          <section>
            <h3>Categorias de consumo</h3>

            {analise.categoriasConsumo.map((categoria) => (
              <div key={categoria.categoria}>
                <div>
                  <strong>{categoria.categoria}</strong>
                  <span> R$ {categoria.valor.toFixed(2)}</span>
                  <span> {categoria.percentual}%</span>
                </div>

                <progress value={categoria.percentual} max="100">
                  {categoria.percentual}%
                </progress>
              </div>
            ))}
          </section>

          <aside>
            <h3>Insights</h3>

            {analise.insights.map((item) => (
              <article key={item.titulo}>
                <h4>{item.titulo}</h4>
                <strong>{item.valor}</strong>
                <p>{item.descricao}</p>
              </article>
            ))}
          </aside>

          <section>
            <h3>Recomendacoes</h3>

            {analise.recomendacoes.map((recomendacao) => (
              <article key={recomendacao.titulo}>
                <h4>{recomendacao.titulo}</h4>
                <p>{recomendacao.descricao}</p>
              </article>
            ))}
          </section>
        </div>
      )}
    </section>
  );
}

export default Insights;
