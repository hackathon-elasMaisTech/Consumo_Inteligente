import { GoPlus, GoCalendar } from "react-icons/go";
import { useState, useContext } from "react";

import { Modal } from "../Modal/Modal";
import { Cadastro } from "../Cadastro/Cadastro";
import { FiltroPeriodo } from "../FiltroPeriodo/FiltroPeriodo";

import styles from "./MainHeader.module.css";

import { AuthContext } from "../../context/AuthContext";

export const MainHeader = ({ onAddTransaction, onFilterPeriod }) => {
    const { user } = useContext(AuthContext);

    const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
    const [isPeriodoModalOpen, setIsPeriodoModalOpen] = useState(false);

    // ⏰ saudação automática
    const hora = new Date().getHours();

    let saudacao;

    if (hora >= 5 && hora < 12) {
        saudacao = "Bom dia";
    } else if (hora >= 12 && hora < 18) {
        saudacao = "Boa tarde";
    } else {
        saudacao = "Boa noite";
    }

    return (
        <div className={styles.container}>
            {/* saudação */}
            <h1 className={styles.h1}>
                {saudacao},{" "}
                <span className={styles.nomeUsuario}>
                    {user?.nome || "Usuário"}
                </span>
                !
            </h1>

            {/* botões */}
            <div className={styles.btnWrapped}>
                <button
                    className={styles.button}
                    onClick={() => setIsCadastroModalOpen(true)}
                >
                    <GoPlus className={styles.iconButton} />
                    Nova Transação
                </button>

                <button
                    className={styles.button}
                    onClick={() => setIsPeriodoModalOpen(true)}
                >
                    <GoCalendar className={styles.iconButton} />
                    Selecionar Período
                </button>
            </div>

            {/* modal */}
            <Modal
                isOpen={isCadastroModalOpen}
                onClose={() => setIsCadastroModalOpen(false)}
                title="Adicionar Nova Transação"
            >
                <Cadastro
                    onAdd={(novoItem) => {
                        onAddTransaction(novoItem);
                        setIsCadastroModalOpen(false);
                    }}
                />
            </Modal>

            <Modal
                isOpen={isPeriodoModalOpen}
                onClose={() => setIsPeriodoModalOpen(false)}
                title="Selecionar Período"
            >
                <FiltroPeriodo
                    onClose={() => setIsPeriodoModalOpen(false)}
                    onConfirm={(datas) => {
                        if (onFilterPeriod) {
                            onFilterPeriod(datas);
                        }
                    }}
                />
            </Modal>
        </div>
    );
};
