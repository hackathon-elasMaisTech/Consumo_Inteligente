import { GoPlus, GoCalendar } from "react-icons/go";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Cadastro } from "../Cadastro/Cadastro";
import styles from "./MainHeader.module.css";

export const MainHeader = ({ onAddTransaction }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Olá, User!</h1>
            <div className={styles.btnWrapped}>
                <button
                    className={styles.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    <GoPlus className={styles.iconButton} /> Nova Transação
                </button>
                <button className={styles.button}>
                    <GoCalendar className={styles.iconButton} /> Selecionar
                    Período
                </button>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Adicionar Nova Transação"
                >
                    <Cadastro
                        onAdd={(novoItem) => {
                            onAddTransaction(novoItem);
                            setIsModalOpen(false);
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
};
