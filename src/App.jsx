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
import { RegraFinanceiraModal } from "./components/RegraFinanceiraModal/RegraFinanceiraModal";

function App() {
    const [consumos, setConsumos] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroPeriodo, setFiltroPeriodo] = useState({
        dataInicio: "",
        dataFim: "",
    });
    const [isRegraModalOpen, setIsRegraModalOpen] = useState(false);
    const [regraFinanceira, setRegraFinanceira] = useState({
        fixos: 50,
        flexiveis: 30,
        investimentos: 20,
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
                item.dataUser >= filtroPeriodo.dataInicio) &&
            (filtroPeriodo.dataFim === "" ||
                item.dataUser <= filtroPeriodo.dataFim),
    );

    // cálculos
    const categoriasInvestimentos = ["investimento", "reserva"];

    const totalReceitas = consumosFiltrados
        .filter(
            (i) =>
                i.tipo === "receita" &&
                !categoriasInvestimentos.includes(i.categoria),
        )
        .reduce((acc, i) => acc + i.valor, 0);

    const totalDespesas = consumosFiltrados
        .filter(
            (i) =>
                i.tipo === "despesa" &&
                !categoriasInvestimentos.includes(i.categoria),
        )
        .reduce((acc, i) => acc + i.valor, 0);

    const saldo = totalReceitas - totalDespesas;
    const analise = analisarConsumo(consumosFiltrados, regraFinanceira);
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
                        <Header
                            onOpenConfig={() => setIsRegraModalOpen(true)}
                        />

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

                            <RegraFinanceiraModal
                                isOpen={isRegraModalOpen}
                                onClose={() => setIsRegraModalOpen(false)}
                                regra={regraFinanceira}
                                onChangeRegra={setRegraFinanceira}
                            />
                        </div>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
