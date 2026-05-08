import styles from "./Filtros.module.css";

export const Filtros = ({
    filtroCategoria,
    setFiltroCategoria,
    filtroTipo,
    setFiltroTipo,
}) => {
    return (
        <section className={styles.container}>
            {/* 🔘 Tipo */}
            <div className={styles.filtroWrapped}>
                <h3>Tipo de Transação</h3>
                <div className={styles.botoesWrapped}>
                    <button
                        className={`${styles.btnTipo} ${filtroTipo === "" ? styles.ativoTodos : ""}`}
                        onClick={() => setFiltroTipo("")}
                    >
                        Todos
                    </button>

                    <button
                        className={`${styles.btnTipo} ${filtroTipo === "receita" ? styles.ativoReceita : ""}`}
                        onClick={() => setFiltroTipo("receita")}
                    >
                        Receita
                    </button>

                    <button
                        className={`${styles.btnTipo} ${filtroTipo === "despesa" ? styles.ativoDespesa : ""}`}
                        onClick={() => setFiltroTipo("despesa")}
                    >
                        Despesa
                    </button>
                </div>
            </div>

            {/* 📂 Categoria */}
            <div className={styles.filtroWrapped}>
                <h3>Filtrar por Categoria</h3>

                <select
                    className={styles.selectCategoria}
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                    <option value="">Todas as categorias</option>

                    {/* despesas */}
                    <option value="mercado">Mercado</option>
                    <option value="transporte">Transporte</option>
                    <option value="lazer">Lazer</option>
                    <option value="contas">Contas</option>
                    <option value="moradia">Moradia</option>
                    <option value="saude">Saúde</option>
                    <option value="educacao">Educação</option>
                    <option value="cuidados_pessoais">Cuidados Pessoais</option>
                    <option value="compras">Compras</option>
                    <option value="assinaturas">Assinaturas</option>
                    <option value="outros">Outros</option>
                    <option value="investimento">Investimento</option>
                    <option value="reserva">Reserva</option>

                    {/* receitas */}
                    <option value="salario">Salário</option>
                    <option value="freelance">Freelance</option>
                    <option value="outros">Outros</option>
                </select>
            </div>
        </section>
    );
};
