import { Modal } from "../Modal/Modal";
import styles from "./RegraFinanceiraModal.module.css";
import { GoQuestion } from "react-icons/go";

export const RegraFinanceiraModal = ({
    isOpen,
    onClose,
    regra,
    onChangeRegra,
}) => {
    const atualizarRegra = (campo, valor) => {
        const novoValor = Number(valor);

        if (campo === "fixos") {
            const flexiveis = Math.min(regra.flexiveis, 100 - novoValor);
            onChangeRegra({
                fixos: novoValor,
                flexiveis,
                investimentos: 100 - novoValor - flexiveis,
            });
        }

        if (campo === "flexiveis") {
            const flexiveis = Math.min(novoValor, 100 - regra.fixos);
            onChangeRegra({
                fixos: regra.fixos,
                flexiveis,
                investimentos: 100 - regra.fixos - flexiveis,
            });
        }

        if (campo === "investimentos") {
            const investimentos = Math.min(novoValor, 100 - regra.fixos);
            onChangeRegra({
                fixos: regra.fixos,
                flexiveis: 100 - regra.fixos - investimentos,
                investimentos,
            });
        }
    };

    const restaurarPadrao = () => {
        onChangeRegra({
            fixos: 50,
            flexiveis: 30,
            investimentos: 20,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Regra financeira"
        >
            <div className={styles.container}>
                <p className={styles.description}>
                    Ajuste como a renda deve ser distribuída entre gastos fixos,
                    gastos flexíveis e investimentos.
                </p>

                <div className={styles.sliderGroup}>
                    <div className={styles.sliderHeader}>
                        <div className={styles.labelWrapped}>
                            <label htmlFor="regra-fixos">Gastos fixos</label>
                            <GoQuestion
                                className={styles.infoIcon}
                                title="Gastos fixos são compromissos essenciais e recorrentes do orçamento."
                            />
                        </div>
                        <span>{regra.fixos}%</span>
                    </div>
                    <input
                        id="regra-fixos"
                        type="range"
                        min="0"
                        max="100"
                        value={regra.fixos}
                        style={{ "--slider-percent": `${regra.fixos}%` }}
                        onChange={(event) =>
                            atualizarRegra("fixos", event.target.value)
                        }
                    />
                </div>

                <div className={styles.sliderGroup}>
                    <div className={styles.sliderHeader}>
                        <div className={styles.labelWrapped}>
                            <label htmlFor="regra-flexiveis">
                                Gastos flexíveis
                            </label>
                            <GoQuestion
                                className={styles.infoIcon}
                                title="Gastos flexíveis são escolhas de consumo que podem ser ajustadas com mais facilidade."
                            />
                        </div>
                        <span>{regra.flexiveis}%</span>
                    </div>
                    <input
                        id="regra-flexiveis"
                        type="range"
                        min="0"
                        max="100"
                        value={regra.flexiveis}
                        style={{
                            "--slider-percent": `${regra.flexiveis}%`,
                        }}
                        onChange={(event) =>
                            atualizarRegra("flexiveis", event.target.value)
                        }
                    />
                </div>

                <div className={styles.sliderGroup}>
                    <div className={styles.sliderHeader}>
                        <div className={styles.labelWrapped}>
                            <label htmlFor="regra-investimentos">
                                Investimentos
                            </label>
                            <GoQuestion
                                className={styles.infoIcon}
                                title="Investimentos são valores separados para reserva, objetivos futuros ou crescimento financeiro."
                            />
                        </div>
                        <span>{regra.investimentos}%</span>
                    </div>
                    <input
                        id="regra-investimentos"
                        type="range"
                        min="0"
                        max="100"
                        value={regra.investimentos}
                        style={{
                            "--slider-percent": `${regra.investimentos}%`,
                        }}
                        onChange={(event) =>
                            atualizarRegra(
                                "investimentos",
                                event.target.value,
                            )
                        }
                    />
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.secondaryButton}
                        onClick={restaurarPadrao}
                        type="button"
                    >
                        Restaurar padrão
                    </button>

                    <button
                        className={styles.primaryButton}
                        onClick={onClose}
                        type="button"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </Modal>
    );
};
