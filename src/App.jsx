import { useEffect, useState } from "react";
import { getConsumos, createConsumo, deleteConsumo } from "./services/api";

import "./styles/global.css";

import Cadastro from "./pages/Cadastro";
import Lista from "./pages/Lista";
import { analisarConsumo } from "./utils/analiseConsumo";

// novos componentes
import { Header } from "./components/Header/Header";
import { Resumo } from "./components/Resumo/Resumo";
import Filtros from "./components/Filtros";
import Insights from "./components/Insights/Insights";
import { MainHeader } from "./components/MainHeader/MainHeader";
import Recomendacoes from "./components/Recomendacoes/Recomendacoes";
import VisaoConsumo from "./components/VisaoConsumo/VisaoConsumo";

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
        .filter((i) => i.tipo === "receita")
        .reduce((acc, i) => acc + i.valor, 0);

    const totalDespesas = consumos
        .filter((i) => i.tipo === "despesa")
        .reduce((acc, i) => acc + i.valor, 0);

    const saldo = totalReceitas - totalDespesas;
    const analise = analisarConsumo(consumos);

    // filtro
    const consumosFiltrados = consumos.filter(
        (item) =>
            (filtroCategoria === "" || item.categoria === filtroCategoria) &&
            (filtroTipo === "" || item.tipo === filtroTipo),
    );

    return (
        <div className="app-container">
            <Header />

            <MainHeader />

            <Resumo
                receitas={totalReceitas}
                despesas={totalDespesas}
                saldo={saldo}
            />

            <Cadastro onAdd={adicionarConsumo} />

            <Lista consumos={consumosFiltrados} onDelete={removerConsumo} />


            <Filtros
                filtroCategoria={filtroCategoria}
                setFiltroCategoria={setFiltroCategoria}
                filtroTipo={filtroTipo}
                setFiltroTipo={setFiltroTipo}
            />

            <VisaoConsumo analise={analise}/>
            <Insights analise={analise} />
            <Recomendacoes analise={analise}/>
        </div>
    );
}

export default App;
