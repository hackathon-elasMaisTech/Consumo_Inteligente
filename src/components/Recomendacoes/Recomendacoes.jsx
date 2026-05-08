import { useRef, useState, useEffect } from "react";
import styles from "./Recomendacoes.module.css";
import {
    MdOutlineThumbDown,
    MdOutlineThumbUp,
    MdChevronLeft,
    MdChevronRight,
} from "react-icons/md";

export const Recomendacoes = ({ analise }) => {
    const carrosselRef = useRef(null);

    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const handleScroll = () => {
        if (carrosselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                carrosselRef.current;

            setIsAtStart(scrollLeft <= 0);
            setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
        }
    };

    useEffect(() => {
        handleScroll();
    }, [analise]);

    if (!analise) {
        return <p>Carregando recomendações...</p>;
    }

    const recomendacoes = analise.recomendacoes;

    const rolarParaEsquerda = () => {
        if (carrosselRef.current) {
            carrosselRef.current.scrollBy({
                left: -carrosselRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

    const rolarParaDireita = () => {
        if (carrosselRef.current) {
            carrosselRef.current.scrollBy({
                left: carrosselRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className={styles.recomendacoesContainer}>
            <h2 className={styles.title}>Recomendações</h2>

            {!recomendacoes || recomendacoes.length === 0 ? (
                <p className={styles.emptyMessage}>
                    Nenhuma recomendação disponível.
                </p>
            ) : (
                <div className={styles.carrosselWrapper}>
                    {!isAtStart && (
                        <button
                            className={`${styles.btnNavegacao} ${styles.btnEsquerda}`}
                            onClick={rolarParaEsquerda}
                        >
                            <MdChevronLeft />
                        </button>
                    )}

                    <div
                        className={styles.recomendacoesList}
                        ref={carrosselRef}
                        onScroll={handleScroll}
                    >
                        {recomendacoes.map((recomendacao) => (
                            <article
                                className={styles.recomendacaoItem}
                                key={recomendacao.titulo}
                            >
                                <span
                                    className={`${styles.icon} ${
                                        recomendacao.tipo === "negativa"
                                            ? styles.iconNegativo
                                            : styles.iconPositivo
                                    }`}
                                >
                                    {recomendacao.tipo === "negativa" ? (
                                        <MdOutlineThumbDown />
                                    ) : (
                                        <MdOutlineThumbUp />
                                    )}
                                </span>
                                <h4>{recomendacao.titulo}</h4>
                                <p>{recomendacao.descricao}</p>
                                {recomendacao.destaque && (
                                    <strong className={styles.highlight}>
                                        {recomendacao.destaque}
                                    </strong>
                                )}
                            </article>
                        ))}
                    </div>
                    {!isAtEnd && (
                        <button
                            className={`${styles.btnNavegacao} ${styles.btnDireita}`}
                            onClick={rolarParaDireita}
                        >
                            <MdChevronRight />
                        </button>
                    )}
                </div>
            )}
        </section>
    );
};
