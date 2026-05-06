import { GoPlus, GoCalendar } from "react-icons/go";
import styles from "./MainHeader.module.css";

export const MainHeader = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Olá, User!</h1>
            <div className={styles.btnWrapped}>
                <button className={styles.button}>
                    <GoPlus className={styles.iconButton} /> Nova Transação
                </button>
                <button className={styles.button}>
                    <GoCalendar className={styles.iconButton} /> Selecionar
                    Período
                </button>
            </div>
        </div>
    );
};
