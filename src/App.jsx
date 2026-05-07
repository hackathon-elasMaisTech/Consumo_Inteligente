import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getConsumos, createConsumo, deleteConsumo } from "./services/api";
import ProtectedRoute from "./components/ProtectedRoute";
import { analisarConsumo } from "./utils/analiseConsumo";

// estilos
import "./styles/global.css";
import styles from "./App.module.css";

// páginas
import Login from "./pages/Login/Login";
import CadastroLogin from "./pages/CadastroLogin/CadastroLogin";

// componentes
import { Header } from "./components/Header/Header";
import { MainHeader } from "./components/MainHeader/MainHeader";
import { Resumo } from "./components/Resumo/Resumo";
import { Filtros } from "./components/Filtros/Filtros";
import { ListaTransacoes } from "./components/ListaTransacoes/ListaTransacoes";
import { Insights } from "./components/Insights/Insights";
import { Recomendacoes } from "./components/Recomendacoes/Recomendacoes";
import { VisaoConsumo } from "./components/VisaoConsumo/VisaoConsumo";

function App() {
    const [consumos, setConsumos] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroPeriodo, setFiltroPeriodo] = useState({
        dataInicio: "",
        dataFim: "",
    });

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

    // filtro
    const consumosFiltrados = consumos.filter(
        (item) =>
            (filtroCategoria === "" || item.categoria === filtroCategoria) &&
            (filtroTipo === "" || item.tipo === filtroTipo) &&
            (filtroPeriodo.dataInicio === "" ||
                item.data >= filtroPeriodo.dataInicio) &&
            (filtroPeriodo.dataFim === "" ||
                item.data <= filtroPeriodo.dataFim),
    );

    // cálculos
    const totalReceitas = consumos
        .filter((i) => i.tipo === "receita")
        .reduce((acc, i) => acc + i.valor, 0);

    const totalDespesas = consumos
        .filter((i) => i.tipo === "despesa")
        .reduce((acc, i) => acc + i.valor, 0);

    const saldo = totalReceitas - totalDespesas;
    const analise = analisarConsumo(consumos);
    const categoriaDominante = analise.insightCategoriaDominante?.categoria;

    return (
        <Routes>
            {/* 🔐 Login */}
            <Route path="/" element={<Login />} />
            {/* 📝 Cadastro */}
            <Route path="/cadastroLogin" element={<CadastroLogin />} />
            {/* 🏠 Home */}
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Header />

                        <div className={styles.appContainer}>
                            <MainHeader
                                onAddTransaction={adicionarConsumo}
                                onFilterPeriod={(datas) =>
                                    setFiltroPeriodo(datas)
                                }
                            />

                            <Resumo
                                receitas={totalReceitas}
                                despesas={totalDespesas}
                                saldo={saldo}
                                categoriaDominante={categoriaDominante}
                            />

                            <Filtros
                                filtroCategoria={filtroCategoria}
                                setFiltroCategoria={setFiltroCategoria}
                                filtroTipo={filtroTipo}
                                setFiltroTipo={setFiltroTipo}
                            />

                            <ListaTransacoes
                                consumos={consumosFiltrados}
                                onDelete={removerConsumo}
                            />
                            <section className={styles.consumoInsightsWrapped}>
                                <VisaoConsumo analise={analise} />
                                <Insights analise={analise} />
                            </section>

                            <Recomendacoes analise={analise} />
                        </div>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
