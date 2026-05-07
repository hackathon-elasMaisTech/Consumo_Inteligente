import styles from "./Recomendacoes.module.css";
import { MdOutlineThumbUp } from "react-icons/md";

export const Recomendacoes = ({ analise }) => {
    if (!analise) {
        return <p>Carregando recomendações...</p>;
    }

    const recomendacoes = analise.recomendacoes;

    return (
        <section className={styles.recomendacoesContainer}>
            <h2 className={styles.title}>Recomendações</h2>

            {!recomendacoes || recomendacoes.length === 0 ? (
                <p>Nenhuma recomendação disponível.</p>
            ) : (
                <div className={styles.recomendacoesList}>
                    {recomendacoes.map((recomendacao) => (
                        <article
                            className={styles.recomendacaoItem}
                            key={recomendacao.titulo}
                        >
                            <span className={styles.icon}>
                                <MdOutlineThumbUp />
                            </span>
                            <h4>{recomendacao.titulo}</h4>
                            <p>{recomendacao.descricao}</p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};
