import { useState } from "react";
import styles from "./FiltroPeriodo.module.css";

export const FiltroPeriodo = ({ onConfirm, onClose }) => {
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [filtroAtivo, setFiltroAtivo] = useState(null);

    const formatarData = (data) => {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    };

    const aplicarFiltroRapido = (dias) => {
        const dataFinal = new Date();
        const dataInicial = new Date();
        dataInicial.setDate(dataFinal.getDate() - dias);

        const dataInicioCalc = formatarData(dataInicial);
        const dataFimCalc = formatarData(dataFinal);

        setDataInicio(dataInicioCalc);
        setDataFim(dataFimCalc);
        setFiltroAtivo(dias);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (dataInicio && dataFim && dataInicio > dataFim) {
            alert("A data inicial não pode ser maior que a data final.");
            return;
        }

        onConfirm({ dataInicio, dataFim });
        onClose();
    };

    const limparFiltro = () => {
        setDataInicio("");
        setDataFim("");
        setFiltroAtivo(null);
        onConfirm({ dataInicio: "", dataFim: "" });
        onClose();
    };

    const handleMudancaManualInicio = (event) => {
        setDataInicio(event.target.value);
        setFiltroAtivo(null);
    };

    const handleMudancaManualFim = (event) => {
        setDataFim(event.target.value);
        setFiltroAtivo(null);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.filterContainer}>
                <label className={styles.label}>Filtros Rápidos</label>
                <div className={styles.filterBtnWrapped}>
                    <button
                        type="button"
                        className={`${styles.filterBtn} ${filtroAtivo === 7 ? styles.activeBtn : ""}`}
                        onClick={() => aplicarFiltroRapido(7)}
                    >
                        Últimos 7 dias
                    </button>
                    <button
                        type="button"
                        className={`${styles.filterBtn} ${filtroAtivo === 15 ? styles.activeBtn : ""}`}
                        onClick={() => aplicarFiltroRapido(15)}
                    >
                        Últimos 15 dias
                    </button>
                    <button
                        type="button"
                        className={`${styles.filterBtn} ${filtroAtivo === 30 ? styles.activeBtn : ""}`}
                        onClick={() => aplicarFiltroRapido(30)}
                    >
                        Último mês
                    </button>
                </div>
            </div>
            <div className={styles.divisor}>
                <span>ou escolha o perído</span>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapped}>
                    <label className={styles.label}>Data Inicial</label>
                    <input
                        type="date"
                        className={styles.inputField}
                        value={dataInicio}
                        onChange={handleMudancaManualInicio}
                    />
                </div>
                <div className={styles.inputWrapped}>
                    <label className={styles.label}>Data Final</label>
                    <input
                        type="date"
                        className={styles.inputField}
                        value={dataFim}
                        onChange={handleMudancaManualFim}
                    />
                </div>
            </div>
            <div className={styles.buttonWrapped}>
                <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={limparFiltro}
                >
                    Limpar
                </button>
                <button type="submit" className={styles.submitBtn}>
                    Aplicar
                </button>
            </div>
        </form>
    );
};
