import styles from "./VisaoConsumo.module.css";
import { formatarMoeda } from "../../utils/formatadorMoeda";
import { CATEGORIAS_DESPESA, NOME_CATEGORIAS } from "../../utils/categorias";

export const VisaoConsumo = ({ analise }) => {
    if (!analise) {
        return <p>Carregando... </p>;
    }

    const categorias = analise.categoriasConsumo || [];

    const categoriasComValores = CATEGORIAS_DESPESA.map((idCategoria) => {
        const categoriaEncontrada = categorias.find(
            (item) => item.categoria === idCategoria,
        );

        const valor = categoriaEncontrada ? categoriaEncontrada.valor : 0;
        const percentual = categoriaEncontrada
            ? Math.round(categoriaEncontrada.percentual)
            : 0;
        return {
            idCategoria,
            valor,
            percentual,
        };
    });

    const categoriasOrdenadas = categoriasComValores.sort((a, b) => {
        return b.percentual - a.percentual;
    });

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Categorias de Consumo</h2>

            <section className={styles.categorias}>
                {categoriasOrdenadas.map((categoria) => (
                    <div
                        className={styles.categoriaItem}
                        key={categoria.idCategoria}
                    >
                        <div className={styles.categoriaHeader}>
                            <strong>
                                {NOME_CATEGORIAS[categoria.idCategoria] ||
                                    categoria.idCategoria}
                            </strong>
                            <div className={styles.valores}>
                                <span>{formatarMoeda(categoria.valor)}</span>
                                <span>{categoria.percentual}%</span>
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
