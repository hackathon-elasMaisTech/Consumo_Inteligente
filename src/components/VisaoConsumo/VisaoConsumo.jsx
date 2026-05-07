import styles from "./VisaoConsumo.module.css";
import { formatarMoeda } from "../../utils/formatadorMoeda";

export const VisaoConsumo = ({ analise }) => {
    if (!analise) {
        return <p>Carregando... </p>;
    }

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Categoria de consumo</h2>

            <section className={styles.categorias}>
                {analise.categoriasConsumo.map((categoria) => (
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
        </section>
    );
};
