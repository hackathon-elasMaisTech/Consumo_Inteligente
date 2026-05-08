import { useState } from "react";
import styles from "./ListaTransacoes.module.css";
import { formatarMoeda } from "../../utils/formatadorMoeda";
import { GoX } from "react-icons/go";

export const ListaTransacoes = ({ consumos, onDelete }) => {
    const [modalAberto, setModalAberto] = useState(false);
    const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

    // abrir modal
    const abrirModalExcluir = (id) => {
        setTransacaoSelecionada(id);
        setModalAberto(true);
    };

    // confirmar exclusão
    const confirmarExclusao = () => {
        onDelete(transacaoSelecionada);

        setModalAberto(false);
        setTransacaoSelecionada(null);
    };

    // ordenação da lista de transação por data (mais recente primeiro)
    const consumosOrdenados = [...consumos].sort((a, b) => {
        const dataA = new Date(a.dataUser);
        const dataB = new Date(b.dataUser);

        return dataB - dataA;
    });

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Lista de Consumos</h2>

            {consumos.length === 0 ? (
                <p>Nenhum item encontrado</p>
            ) : (
                <div className={styles.lista}>
                    {consumosOrdenados.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.infoEsquerda}>
                                <span className={styles.nome}>
                                    {item.nome.charAt(0).toUpperCase() +
                                        item.nome.slice(1)}
                                </span>

                                <span className={styles.categoria}>
                                    {item.categoria.replace("_", " ")}
                                </span>
                            </div>

                            <div className={styles.infoDireita}>
                                <span
                                    className={
                                        item.tipo === "receita"
                                            ? styles.valorReceita
                                            : styles.valorDespesa
                                    }
                                >
                                    {item.tipo === "despesa" ? "- " : "+ "}
                                    {formatarMoeda(item.valor)}
                                </span>

                                <button
                                    className={styles.btnExcluir}
                                    onClick={() => abrirModalExcluir(item.id)}
                                >
                                    <GoX />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL */}
            {modalAberto && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3 className={styles.modalTitulo}>
                            Excluir transação
                        </h3>

                        <p className={styles.modalTexto}>
                            Deseja realmente excluir esta transação?
                        </p>

                        <div className={styles.modalButtons}>
                            <button
                                className={styles.btnConfirmar}
                                onClick={confirmarExclusao}
                            >
                                Sim
                            </button>

                            <button
                                className={styles.btnCancelar}
                                onClick={() => setModalAberto(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
