import { GoPlus, GoCalendar } from "react-icons/go";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Cadastro } from "../Cadastro/Cadastro";
import styles from "./MainHeader.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const MainHeader = ({ onAddTransaction }) => {
    const { user } = useContext(AuthContext);

    // ⏰ horário atual
    const hora = new Date().getHours();

    let saudacao;

    if (hora >= 5 && hora < 12) {
        saudacao = "☀️ Bom dia";
    } else if (hora >= 12 && hora < 18) {
        saudacao = "🌤️ Boa tarde";
    } else {
        saudacao = "🌙 Boa noite";
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.container}>
            {/* 👤 usuário */}
            <div className={styles.userInfo}>
                {/* avatar */}
                {user?.foto ? (
                    <img
                        src={user.foto}
                        alt={user.nome}
                        className={styles.avatar}
                    />
                ) : (
                    <div className={styles.avatarFallback}>
                        {user?.nome?.charAt(0).toUpperCase()}
                    </div>
                )}

                {/* saudação */}
                <h1 className={styles.h1}>
                    {saudacao}, {user?.nome || "Usuário"}!
                </h1>
            </div>

            {/* botões */}
            <div className={styles.btnWrapped}>
                <button
                    className={styles.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    <GoPlus className={styles.iconButton} /> Nova Transação
                </button>

                <button className={styles.button}>
                    <GoCalendar className={styles.iconButton} />
                    Selecionar Período
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
