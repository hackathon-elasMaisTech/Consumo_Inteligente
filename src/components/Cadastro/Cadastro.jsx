import { useState } from "react";
import styles from "./Cadastro.module.css";

export const Cadastro = ({ onAdd }) => {
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("despesa");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!categoria) return alert("Por favor, selecione uma categoria.");

        const novoItem = {
            nome,
            valor: Number(valor),
            categoria,
            tipo,
            data: new Date().toISOString().split("T")[0],
        };

        onAdd(novoItem);

        setNome("");
        setValor("");
        setCategoria("");
        setTipo("despesa");
    };

    // 🎯 categorias dinâmicas
    const categorias =
        tipo === "despesa"
            ? [
                  "mercado",
                  "transporte",
                  "lazer",
                  "contas",
                  "moradia",
                  "saude",
                  "educacao",
                  "cuidados_pessoais",
                  "compras",
                  "assinaturas",
                  "outros",
                  "investimento",
                  "reserva",
              ]
            : ["salario", "freelance", "outros"];

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
                    {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toLocaleUpperCase() +
                                cat.slice(1).replace("_", " ")}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className={styles.submitBtn}>
                Cadastrar
            </button>
        </form>
    );
};
