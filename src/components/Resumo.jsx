function Resumo({ receitas, despesas, saldo }) {
  return (
    <section className="resumo">
      <div className="card receita">
        <h3>Receitas</h3>
        <p>R$ {receitas}</p>
      </div>

      <div className="card despesa">
        <h3>Despesas</h3>
        <p>R$ {despesas}</p>
      </div>

      <div className="card saldo">
        <h3>Saldo</h3>
        <p>R$ {saldo}</p>
      </div>
    </section>
  );
}

export default Resumo;