import { useState } from "react";
import styles from "./Cadastro.module.css";
import {
    CATEGORIAS_DESPESA_FIXA,
    CATEGORIAS_DESPESA_FLEXIVEL,
    CATEGORIAS_INVESTIMENTO,
    CATEGORIAS_RECEITA,
    NOME_CATEGORIAS,
} from "../../utils/categorias";

export const Cadastro = ({ onAdd }) => {
    const dataHoje = new Date().toISOString().split("T")[0];

    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("despesa");
    const [dataUser, setDataUser] = useState(dataHoje);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!categoria) return alert("Por favor, selecione uma categoria.");

        const novoItem = {
            nome,
            valor: Number(valor),
            categoria,
            tipo,
            data: dataHoje,
            dataUser,
        };

        onAdd(novoItem);

        setNome("");
        setValor("");
        setCategoria("");
        setTipo("despesa");
        setDataUser(dataHoje);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.incomeExpenseWrapped}>
                <label
                    className={`${styles.incomeExpenseRadioLabel} 
                    ${tipo === "despesa" ? styles.expenseActive : ""}`}
                >
                    <input
                        type="radio"
                        name="tipo"
                        value="despesa"
                        checked={tipo === "despesa"}
                        onChange={(e) => {
                            setTipo(e.target.value);
                            setCategoria("");
                        }}
                    />
                    Despesa
                </label>
                <label
                    className={`${styles.incomeExpenseRadioLabel} 
                    ${tipo === "receita" ? styles.incomeActive : ""}`}
                >
                    <input
                        type="radio"
                        name="tipo"
                        value="receita"
                        checked={tipo === "receita"}
                        onChange={(e) => {
                            setTipo(e.target.value);
                            setCategoria("");
                        }}
                    />
                    Receita
                </label>
            </div>
            <div className={styles.inputWrapped}>
                <label className={styles.label}>Nome da Transação</label>
                <input
                    className={styles.inputField}
                    placeholder="Ex: Conta de Luz"
                    value={nome}
                    required
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className={styles.valueDateWrapped}>
                <div className={styles.inputWrapped}>
                    <label className={styles.label}>Valor</label>
                    <input
                        className={styles.inputField}
                        type="number"
                        step="any"
                        placeholder="Ex: 150,00"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                </div>

                <div className={styles.inputWrapped}>
                    <label className={styles.label}>Data da Transação</label>
                    <input
                        className={styles.inputField}
                        type="date"
                        value={dataUser}
                        required
                        onChange={(e) => setDataUser(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.inputWrapped}>
                <label className={styles.label}>Categoria</label>
                <select
                    className={styles.selectField}
                    value={categoria}
                    required
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="" disabled>
                        Selecione uma categoria
                    </option>
                    {tipo === "despesa" ? (
                        <>
                            <optgroup label="Despesas Fixas">
                                {CATEGORIAS_DESPESA_FIXA.map((categoria) => (
                                    <option key={categoria} value={categoria}>
                                        {NOME_CATEGORIAS[categoria]}
                                    </option>
                                ))}
                            </optgroup>
                            <optgroup label="Despesas Flexíveis">
                                {CATEGORIAS_DESPESA_FLEXIVEL.map(
                                    (categoria) => (
                                        <option
                                            key={categoria}
                                            value={categoria}
                                        >
                                            {NOME_CATEGORIAS[categoria]}
                                        </option>
                                    ),
                                )}
                            </optgroup>
                            <optgroup label="Investimentos">
                                {CATEGORIAS_INVESTIMENTO.map((categoria) => (
                                    <option key={categoria} value={categoria}>
                                        {NOME_CATEGORIAS[categoria]}
                                    </option>
                                ))}
                            </optgroup>
                        </>
                    ) : (
                        <optgroup label="Receitas">
                            {CATEGORIAS_RECEITA.map((categoria) => (
                                <option key={categoria} value={categoria}>
                                    {NOME_CATEGORIAS[categoria]}
                                </option>
                            ))}
                        </optgroup>
                    )}
                </select>
            </div>

            <button type="submit" className={styles.submitBtn}>
                Cadastrar
            </button>
        </form>
    );
};
