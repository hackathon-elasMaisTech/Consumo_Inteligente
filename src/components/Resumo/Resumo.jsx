import styles from "./Resumo.module.css";
import { formatarMoeda } from "../../utils/formatadorMoeda";

export const Resumo = ({ receitas, despesas, saldo, categoriaDominante }) => {
    return (
        <section className={styles.container}>
            <div className={styles.card}>
                <h3 className={styles.cardTitle}>Receitas</h3>
                <p className={styles.cardValue}>{formatarMoeda(receitas)}</p>
            </div>

            <div className={styles.card}>
                <h3 className={styles.cardTitle}>Despesas</h3>
                <p className={`${styles.cardValue} ${styles.cardValueExpense}`}>
                    {formatarMoeda(despesas)}
                </p>
            </div>

            <div className={styles.card}>
                <h3 className={styles.cardTitle}>Saldo Atual</h3>
                <p className={styles.cardValue}>{formatarMoeda(saldo)}</p>
            </div>

            <div className={styles.card}>
                <h3 className={styles.cardTitle}>Categoria Dominante</h3>
                <p className={styles.cardValue}>
                    {categoriaDominante
                        ? categoriaDominante.charAt(0).toLocaleUpperCase() +
                          categoriaDominante.slice(1).replace("_", " ")
                        : "---"}
                </p>
            </div>
        </section>
    );
};
