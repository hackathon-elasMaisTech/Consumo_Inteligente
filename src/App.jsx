import { useEffect, useState } from "react";
import { getConsumos, createConsumo, deleteConsumo } from "./services/api";

import Cadastro from "./pages/Cadastro";
import Lista from "./pages/Lista";

// novos componentes
import Header from "./components/Header";
import Resumo from "./components/Resumo";
import Filtros from "./components/Filtros";

function App() {
  const [consumos, setConsumos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  useEffect(() => {
    async function carregar() {
      const dados = await getConsumos();
      setConsumos(dados);
    }
    carregar();
  }, []);

  const carregarConsumos = async () => {
    const dados = await getConsumos();
    setConsumos(dados);
  };

  const adicionarConsumo = async (novoItem) => {
    await createConsumo(novoItem);
    carregarConsumos();
  };

  const removerConsumo = async (id) => {
    await deleteConsumo(id);
    carregarConsumos();
  };

  // cálculos
  const totalReceitas = consumos
    .filter(i => i.tipo === "receita")
    .reduce((acc, i) => acc + i.valor, 0);

  const totalDespesas = consumos
    .filter(i => i.tipo === "despesa")
    .reduce((acc, i) => acc + i.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  // filtro
  const consumosFiltrados = consumos.filter(item =>
    (filtroCategoria === "" || item.categoria === filtroCategoria) &&
    (filtroTipo === "" || item.tipo === filtroTipo)
  );

  return (
    <div className="app-container">
      
      <Header />

      <Resumo
        receitas={totalReceitas}
        despesas={totalDespesas}
        saldo={saldo}
      />

      

      <Cadastro onAdd={adicionarConsumo} />

      <Lista
        consumos={consumosFiltrados}
        onDelete={removerConsumo}
      />

      <Filtros
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        filtroTipo={filtroTipo}
        setFiltroTipo={setFiltroTipo}
      />
    </div>
  );
}

export default App;