export const Filtros = ({
    filtroCategoria,
    setFiltroCategoria,
    filtroTipo,
    setFiltroTipo,
}) => {
    return (
        <section className="filtros">
            {/* 🔘 Tipo */}
            <div className="filtro-tipo">
                <h3>Tipo</h3>

                <button
                    className={filtroTipo === "" ? "ativo" : ""}
                    onClick={() => setFiltroTipo("")}
                >
                    Todos
                </button>

                <button
                    className={filtroTipo === "receita" ? "ativo receita" : ""}
                    onClick={() => setFiltroTipo("receita")}
                >
                    Receita
                </button>

                <button
                    className={filtroTipo === "despesa" ? "ativo despesa" : ""}
                    onClick={() => setFiltroTipo("despesa")}
                >
                    Despesa
                </button>
            </div>

            {/* 📂 Categoria */}
            <div className="filtro-categoria">
                <h3>Categoria</h3>

                <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                    <option value="">Todas</option>

                    {/* despesas */}
                    <option value="mercado">Mercado</option>
                    <option value="transporte">Transporte</option>
                    <option value="lazer">Lazer</option>
                    <option value="contas">Contas</option>
                    <option value="moradia">Moradia</option>
                    <option value="saude">Saúde</option>
                    <option value="cuidados_pessoais">Cuidados Pessoais</option>
                    <option value="compras">Compras</option>
                    <option value="assinaturas">Assinaturas</option>

                    {/* receitas */}
                    <option value="salario">Salário</option>
                    <option value="freelance">Freelance</option>
                    <option value="investimento">Investimento</option>
                </select>
            </div>
        </section>
    );
};
