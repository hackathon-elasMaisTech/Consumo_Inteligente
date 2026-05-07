import styles from "./Modal.module.css";
import { GoX } from "react-icons/go";

export const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.container}>
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
