import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getConsumos, createConsumo, deleteConsumo } from "./services/api";
import ProtectedRoute from "./components/ProtectedRoute";
import { analisarConsumo } from "./utils/analiseConsumo";
import { formatarMoeda } from "./utils/formatadorMoeda";
import {
    CATEGORIAS_DESPESA_FIXA,
    CATEGORIAS_DESPESA_FLEXIVEL,
    NOME_CATEGORIAS,
} from "./utils/categorias";
import { obterPeriodoMesAtual } from "./utils/periodo";

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
import { OnboardingTutorial } from "./components/OnboardingTutorial/OnboardingTutorial";

function App() {
    const [consumos, setConsumos] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroPeriodo, setFiltroPeriodo] = useState(obterPeriodoMesAtual);
    const [isRegraModalOpen, setIsRegraModalOpen] = useState(false);
    const [regraFinanceira, setRegraFinanceira] = useState({
        fixos: 50,
        flexiveis: 30,
        investimentos: 20,
    });
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => {
        return localStorage.getItem("lumi-onboarding-visto") !== "true";
    });
    const [notificacoes, setNotificacoes] = useState([]);

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
        return dados;
    };

    const adicionarConsumo = async (novoItem) => {
        await createConsumo(novoItem);
        const dadosAtualizados = await carregarConsumos();
        gerarNotificacaoDeLimite(novoItem, dadosAtualizados);
    };

    const removerConsumo = async (id) => {
        await deleteConsumo(id);
        carregarConsumos();
    };

    const fecharOnboarding = () => {
        localStorage.setItem("lumi-onboarding-visto", "true");
        setIsOnboardingOpen(false);
    };

    const atualizarFiltroPeriodo = (datas) => {
        if (!datas.dataInicio && !datas.dataFim) {
            setFiltroPeriodo(obterPeriodoMesAtual());
            return;
        }

        setFiltroPeriodo(datas);
    };

    const gerarNotificacaoDeLimite = (novoItem, dadosAtualizados) => {
        if (novoItem.tipo !== "despesa") {
            return;
        }

        const grupos = {
            fixos: {
                titulo: "Gastos fixos acima do limite",
                nome: "fixos",
                categorias: CATEGORIAS_DESPESA_FIXA,
            },
            flexiveis: {
                titulo: "Gastos flexíveis acima do limite",
                nome: "flexíveis",
                categorias: CATEGORIAS_DESPESA_FLEXIVEL,
            },
        };

        const grupoEncontrado = Object.entries(grupos).find(([, grupo]) =>
            grupo.categorias.includes(novoItem.categoria),
        );

        if (!grupoEncontrado) {
            return;
        }

        const [grupo, dadosGrupo] = grupoEncontrado;
        const dadosDoPeriodo = dadosAtualizados.filter((item) => {
            const dataTransacao = item.dataUser || item.data;

            return (
                dataTransacao >= filtroPeriodo.dataInicio &&
                dataTransacao <= filtroPeriodo.dataFim
            );
        });

        const novaAnalise = analisarConsumo(dadosDoPeriodo, regraFinanceira);
        const resumoGrupo = novaAnalise.resumoRegraFinanceira?.[grupo];

        if (!resumoGrupo || resumoGrupo.dentro) {
            return;
        }

        const percentual = Math.round(resumoGrupo.percentual);
        const limite = regraFinanceira[grupo];

        const novaNotificacao = {
            id: `${Date.now()}-${grupo}`,
            titulo: dadosGrupo.titulo,
            mensagem: `Seus gastos ${dadosGrupo.nome} chegaram a ${percentual}% da renda, acima do limite de ${limite}%. O lançamento foi de ${formatarMoeda(novoItem.valor)} em ${NOME_CATEGORIAS[novoItem.categoria] || novoItem.categoria}.`,
        };

        setNotificacoes((notificacoesAtuais) =>
            [novaNotificacao, ...notificacoesAtuais].slice(0, 5),
        );
    };

    // filtro
    const consumosFiltrados = consumos.filter((item) => {
        const dataTransacao = item.dataUser || item.data;

        return (
            (filtroCategoria === "" || item.categoria === filtroCategoria) &&
            (filtroTipo === "" || item.tipo === filtroTipo) &&
            dataTransacao >= filtroPeriodo.dataInicio &&
            dataTransacao <= filtroPeriodo.dataFim
        );
    });

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
    const totalInvestimentos = analise.investimentos?.total ?? 0;

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
                            notificacoes={notificacoes}
                            onClearNotificacoes={() => setNotificacoes([])}
                            onReadNotificacao={(id) =>
                                setNotificacoes((notificacoesAtuais) =>
                                    notificacoesAtuais.filter(
                                        (notificacao) => notificacao.id !== id,
                                    ),
                                )
                            }
                        />

                        <div className={styles.appContainer}>
                            <MainHeader
                                onAddTransaction={adicionarConsumo}
                                onFilterPeriod={atualizarFiltroPeriodo}
                                filterPeriod={filtroPeriodo}
                            />

                            <Resumo
                                receitas={totalReceitas}
                                despesas={totalDespesas}
                                saldo={saldo}
                                investimentos={totalInvestimentos}
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

                            <OnboardingTutorial
                                isOpen={isOnboardingOpen}
                                onClose={fecharOnboarding}
                            />
                        </div>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
