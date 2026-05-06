import styles from "./Modal.module.css";
import { GoX } from "react-icons/go";

export const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            {/* O stopPropagation impede que o modal feche ao clicar dentro da caixa branca */}
            <div
                className={styles.container}
                onClick={(e) => e.stopPropagation}
            >
                <header className={styles.header}>
                    <h3>{title}</h3>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <GoX />
                    </button>
                </header>

                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};
