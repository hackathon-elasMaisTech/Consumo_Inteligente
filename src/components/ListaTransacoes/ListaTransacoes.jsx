import styles from "./ListaTransacoes.module.css";
import { formatarMoeda } from "../../utils/formatadorMoeda";
import { GoX } from "react-icons/go";

export const ListaTransacoes = ({ consumos, onDelete }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Lista de Consumos</h2>

            {consumos.lenght === 0 ? (
                <p>Nenhum item encontrado</p>
            ) : (
                <div className={styles.lista}>
                    {consumos.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.infoEsquerda}>
                                <span className={styles.nome}>
                                    {item.nome.charAt(0).toLocaleUpperCase() +
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
                                    onClick={() => onDelete(item.id)}
                                >
                                    <GoX />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
