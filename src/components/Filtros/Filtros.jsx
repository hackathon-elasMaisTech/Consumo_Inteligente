import {
    CATEGORIAS_DESPESA_FIXA,
    CATEGORIAS_DESPESA_FLEXIVEL,
    CATEGORIAS_INVESTIMENTO,
    CATEGORIAS_RECEITA,
    NOME_CATEGORIAS,
} from "../../utils/categorias";
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

                    <optgroup label="Despesas Fixas">
                        {CATEGORIAS_DESPESA_FIXA.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {NOME_CATEGORIAS[categoria]}
                            </option>
                        ))}
                    </optgroup>

                    <optgroup label="Despesas Flexíveis">
                        {CATEGORIAS_DESPESA_FLEXIVEL.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {NOME_CATEGORIAS[categoria]}
                            </option>
                        ))}
                    </optgroup>

                    <optgroup label="Investimentos">
                        {CATEGORIAS_INVESTIMENTO.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {NOME_CATEGORIAS[categoria]}
                            </option>
                        ))}
                    </optgroup>

                    <optgroup label="Receitas">
                        {CATEGORIAS_RECEITA.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {NOME_CATEGORIAS[categoria]}
                            </option>
                        ))}
                    </optgroup>
                </select>
            </div>
        </section>
    );
};
