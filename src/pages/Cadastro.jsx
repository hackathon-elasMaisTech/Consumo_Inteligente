import { useState } from "react";

function Cadastro({ onAdd }) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("despesa");

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoItem = {
      nome,
      valor: Number(valor),
      categoria,
      tipo,
      data: new Date().toISOString().split("T")[0]
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
          "cuidados_pessoais",
          "compras",
          "assinaturas"
        ]
      : ["salario", "freelance", "investimento"];

  return (
    <div>
      <h2>Cadastro</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        {/* 👇 seleciona tipo primeiro */}
        <select
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value);
            setCategoria(""); // reseta categoria ao trocar tipo
          }}
        >
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>

        {/* 👇 categoria dinâmica */}
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>

          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
