import { useState } from "react";
import styles from "./FiltroPeriodo.module.css";

export const FiltroPeriodo = ({ onConfirm, onClose }) => {
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

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
        onConfirm({ dataInicio: "", dataFim: "" });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.inputWrapped}>
                <label className={styles.label}>Data Inicial</label>
                <input
                    type="date"
                    className={styles.inputField}
                    value={dataInicio}
                    onChange={(event) => setDataInicio(event.target.value)}
                />
            </div>
            <div className={styles.inputWrapped}>
                <label className={styles.label}>Data Final</label>
                <input
                    type="date"
                    className={styles.inputField}
                    value={dataFim}
                    onChange={(event) => setDataFim(event.target.value)}
                />
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
