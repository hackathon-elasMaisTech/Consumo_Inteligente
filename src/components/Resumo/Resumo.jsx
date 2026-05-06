import styles from "./Resumo.module.css";
import { formatarMoeda } from "../../utils/formatadorMoeda";

export const Resumo = ({ receitas, despesas, saldo }) => {
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
                <p className={styles.cardValue}>Moradia</p>
            </div>
        </section>
    );
};
