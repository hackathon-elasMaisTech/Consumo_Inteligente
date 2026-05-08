import { useState } from "react";
import styles from "./ListaTransacoes.module.css";
import { formatarMoeda } from "../../utils/formatadorMoeda";
import { GoX } from "react-icons/go";
import { NOME_CATEGORIAS } from "../../utils/categorias";

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
                <p className={styles.emptyMessage}>Nenhum item encontrado</p>
            ) : (
                <div className={styles.lista}>
                    {consumosOrdenados.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.infoEsquerda}>
                                <span className={styles.nome}>
                                    {item.nome.charAt(0).toUpperCase() +
                                        item.nome.slice(1)}
                                </span>

                                <div className={styles.dataCategoriaWrapped}>
                                    <span className={styles.categoria}>
                                        {NOME_CATEGORIAS[item.categoria] ||
                                            item.categoria}
                                    </span>
                                    <span className={styles.separador}>•</span>
                                    <span className={styles.data}>
                                        {item.dataUser
                                            ? item.dataUser
                                                  .split("-")
                                                  .reverse()
                                                  .join("/")
                                            : "Sem Data"}
                                    </span>
                                </div>
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
                                    aria-label="Excluir transação"
                                    title="Excluir"
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
                                className={styles.btnCancelar}
                                onClick={() => setModalAberto(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                className={styles.btnConfirmar}
                                onClick={confirmarExclusao}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
