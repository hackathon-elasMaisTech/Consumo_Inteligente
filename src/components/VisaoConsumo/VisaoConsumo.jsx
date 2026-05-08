import styles from "./VisaoConsumo.module.css";
import { formatarMoeda } from "../../utils/formatadorMoeda";

export const VisaoConsumo = ({ analise }) => {
    if (!analise) {
        return <p>Carregando... </p>;
    }

    const categorias = analise.categoriasConsumo || [];

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Categoria de consumo</h2>

            {categorias.length === 0 ? (
                <p className={styles.emptyMessage}>
                    Nenhuma categoria encontrada
                </p>
            ) : (
                <section className={styles.categorias}>
                    {categorias.map((categoria) => (
                        <div
                            className={styles.categoriaItem}
                            key={categoria.categoria}
                        >
                            <div className={styles.categoriaHeader}>
                                <strong>{categoria.categoria}</strong>
                                <div className={styles.valores}>
                                    <span>{formatarMoeda(categoria.valor)}</span>
                                    <span>{Math.round(categoria.percentual)}%</span>
                                </div>
                            </div>

                            <progress
                                className={styles.progress}
                                value={categoria.percentual}
                                max="100"
                            >
                                {categoria.percentual}%
                            </progress>
                        </div>
                    ))}
                </section>
            )}
        </section>
    );
};
