import { formatarMoeda } from "./formatadorMoeda";

const regraPadrao = {
    fixos: 50,
    flexiveis: 30,
    investimentos: 20,
};

export function analisarPerfil(
    totalReceitas,
    totalPorCategoria,
    regra = regraPadrao,
) {
    const semDadosParaAnalise =
        totalReceitas === 0 && Object.keys(totalPorCategoria).length === 0;

    if (semDadosParaAnalise) {
        const resumoVazio = {
            fixos: {
                total: 0,
                limite: 0,
                percentual: 0,
                dentro: true,
            },
            flexiveis: {
                total: 0,
                limite: 0,
                percentual: 0,
                dentro: true,
            },
            investimentos: {
                total: 0,
                meta: 0,
                percentual: 0,
                dentro: true,
            },
            saldoRestante: 0,
            regra,
        };

        return {
            insights: [],
            recomendacoes: [],
            resumoRegraFinanceira: resumoVazio,
            resumoRegra503020: resumoVazio,
        };
    }

    const categoriasFixas = [
        "mercado",
        "transporte",
        "contas",
        "moradia",
        "saude",
        "educacao",
    ];
    const categoriasFlexiveis = [
        "lazer",
        "cuidados_pessoais",
        "compras",
        "assinaturas",
        "outros",
    ];
    const categoriasInvestimentos = ["investimento", "reserva"];

    const calcularTotalPorGrupo = (categoriasGrupo) =>
        Object.entries(totalPorCategoria).reduce(
            (total, [categoria, valor]) => {
                if (categoriasGrupo.includes(categoria)) {
                    return total + valor;
                }

                return total;
            },
            0,
        );

    const totalFixos = calcularTotalPorGrupo(categoriasFixas);
    const totalFlexiveis = calcularTotalPorGrupo(categoriasFlexiveis);
    const totalInvestimentos = calcularTotalPorGrupo(categoriasInvestimentos);
    const despesaTotal = totalFixos + totalFlexiveis + totalInvestimentos;
    const saldoRestante = totalReceitas - despesaTotal;

    const limiteFixos = totalReceitas * (regra.fixos / 100);
    const limiteFlexiveis = totalReceitas * (regra.flexiveis / 100);
    const metaInvestimentos = totalReceitas * (regra.investimentos / 100);

    const calcularPercentual = (valor) =>
        totalReceitas === 0
            ? 0
            : Number(((valor / totalReceitas) * 100).toFixed(2));

    const percentualFixos = calcularPercentual(totalFixos);
    const percentualFlexiveis = calcularPercentual(totalFlexiveis);
    const percentualInvestimentos = calcularPercentual(totalInvestimentos);
    const percentualFixosExibicao = Math.round(percentualFixos);
    const percentualFlexiveisExibicao = Math.round(percentualFlexiveis);
    const percentualInvestimentosExibicao = Math.round(
        percentualInvestimentos,
    );
    const faltaParaInvestimentos = Number(
        (metaInvestimentos - totalInvestimentos).toFixed(2),
    );
    const valorAcimaFixos = Number((totalFixos - limiteFixos).toFixed(2));
    const valorAcimaFlexiveis = Number(
        (totalFlexiveis - limiteFlexiveis).toFixed(2),
    );
    const folgaFixos = Number((limiteFixos - totalFixos).toFixed(2));
    const folgaFlexiveis = Number((limiteFlexiveis - totalFlexiveis).toFixed(2));

    let descricaoFixos;
    let descricaoFlexiveis;
    let descricaoInvestimentos;
    let destaqueFixos;
    let destaqueFlexiveis;
    let destaqueInvestimentos;

    if (percentualFixos > 100) {
        descricaoFixos = `Os gastos fixos consumiram ${percentualFixosExibicao}% da renda, ultrapassando o valor recebido no período.`;
        destaqueFixos = `Revise os lançamentos fixos para entender onde está o maior peso do orçamento.`;
    } else if (percentualFixos > regra.fixos) {
        descricaoFixos = `Os gastos fixos consumiram ${percentualFixosExibicao}% da renda, acima do limite de ${regra.fixos}%.`;
        destaqueFixos = `Isso reduz a margem para escolhas flexíveis e investimentos.`;
    } else {
        descricaoFixos = `Os gastos fixos consumiram ${percentualFixosExibicao}% da renda e ficaram dentro do limite de ${regra.fixos}%.`;
        destaqueFixos = `Ainda há ${formatarMoeda(folgaFixos)} de folga nessa meta.`;
    }

    if (percentualFlexiveis > 100) {
        descricaoFlexiveis = `Os gastos flexíveis chegaram a ${percentualFlexiveisExibicao}% da renda, ultrapassando o valor recebido no período.`;
        destaqueFlexiveis = `Esse grupo precisa de revisão porque compromete o equilíbrio do orçamento.`;
    } else if (percentualFlexiveis > regra.flexiveis) {
        descricaoFlexiveis = `Os gastos flexíveis chegaram a ${percentualFlexiveisExibicao}% da renda, acima do limite de ${regra.flexiveis}%.`;
        destaqueFlexiveis = `Esse é o grupo com maior potencial de ajuste no curto prazo.`;
    } else {
        descricaoFlexiveis = `Os gastos flexíveis ficaram em ${percentualFlexiveisExibicao}% da renda, dentro do limite de ${regra.flexiveis}%.`;
        destaqueFlexiveis = `Isso indica bom controle nas despesas ajustáveis.`;
    }

    if (regra.investimentos === 0) {
        descricaoInvestimentos =
            "Nenhuma meta de investimento foi definida nesta regra.";
        destaqueInvestimentos =
            "Use a configuração da regra financeira para reservar parte da renda para objetivos futuros.";
    } else if (percentualInvestimentos >= regra.investimentos) {
        descricaoInvestimentos = `Seus investimentos superaram a meta configurada de ${regra.investimentos}%.`;
        destaqueInvestimentos = `Neste período, você destinou ${percentualInvestimentosExibicao}% da renda para reserva ou objetivos financeiros.`;
    } else {
        descricaoInvestimentos = `Você destinou ${percentualInvestimentosExibicao}% da renda para investimentos.`;
        destaqueInvestimentos = `Para alcançar a meta de ${regra.investimentos}%, faltam ${formatarMoeda(faltaParaInvestimentos)}.`;
    }

    const insights = [
        {
            titulo: "Gastos fixos",
            valor: `${percentualFixosExibicao}% da renda`,
            descricao: descricaoFixos,
            destaque: destaqueFixos,
        },
        {
            titulo: "Gastos flexíveis",
            valor: `${percentualFlexiveisExibicao}% da renda`,
            descricao: descricaoFlexiveis,
            destaque: destaqueFlexiveis,
        },
        {
            titulo: "Investimentos",
            valor: `${percentualInvestimentosExibicao}% da renda`,
            descricao: descricaoInvestimentos,
            destaque: destaqueInvestimentos,
        },
    ];

    const recomendacoes = [];

    if (percentualFixos > regra.fixos) {
        recomendacoes.push({
            titulo: "Revise gastos fixos",
            tipo: "negativa",
            descricao: `Os gastos fixos passaram do limite de ${regra.fixos}% da renda em ${formatarMoeda(valorAcimaFixos)}.`,
            destaque:
                "Revise despesas como mercado, moradia, contas e transporte para encontrar possíveis ajustes.",
        });
    } else if (totalReceitas > 0) {
        recomendacoes.push({
            titulo: "Fixos sob controle",
            tipo: "positiva",
            descricao: `Os gastos fixos estão dentro do limite de ${regra.fixos}% definido por você.`,
            destaque: "Isso ajuda a manter estabilidade no orçamento mensal.",
        });
    }

    if (percentualFlexiveis > regra.flexiveis) {
        recomendacoes.push({
            titulo: "Reduza gastos flexíveis",
            tipo: "negativa",
            descricao: `Os gastos flexíveis passaram do limite de ${regra.flexiveis}% da renda em ${formatarMoeda(valorAcimaFlexiveis)}.`,
            destaque:
                "Defina um teto para compras, lazer, cuidados pessoais e assinaturas.",
        });
    } else if (totalReceitas > 0) {
        recomendacoes.push({
            titulo: "Consumo flexível equilibrado",
            tipo: "positiva",
            descricao: `Os gastos com lazer, compras, assinaturas e cuidados pessoais estão dentro do limite de ${regra.flexiveis}% definido por você.`,
            destaque: "Continue acompanhando esses gastos para preservar sua margem.",
        });
    }

    if (regra.investimentos === 0) {
        recomendacoes.push({
            titulo: "Defina uma meta de investimento",
            tipo: "negativa",
            descricao:
                "A regra atual não reserva parte da renda para investimentos.",
            destaque:
                "Se possível, defina uma porcentagem para reserva ou objetivos financeiros.",
        });
    } else if (percentualInvestimentos >= regra.investimentos) {
        recomendacoes.push({
            titulo: "Investimentos em dia",
            tipo: "positiva",
            descricao: `Você atingiu ou superou a meta de ${regra.investimentos}% definida para investimentos ou reserva financeira.`,
            destaque:
                "Continue mantendo esse dinheiro separado dos gastos do mês.",
        });
    } else if (totalInvestimentos > 0) {
        recomendacoes.push({
            titulo: "Você está investindo",
            tipo: "positiva",
            descricao: `Você já direcionou ${percentualInvestimentosExibicao}% da renda para investimentos ou reserva.`,
            destaque: `A meta configurada é de ${regra.investimentos}%.`,
        });

        recomendacoes.push({
            titulo: "Priorize seus investimentos",
            tipo: "negativa",
            descricao:
                "O valor destinado a investimentos ainda está abaixo da meta configurada.",
            destaque: `Faltam ${formatarMoeda(faltaParaInvestimentos)} para atingir o objetivo deste período.`,
        });
    } else {
        recomendacoes.push({
            titulo: "Comece sua reserva",
            tipo: "negativa",
            descricao:
                "Não há valor registrado para investimentos ou reserva neste período.",
            destaque: `Pela regra atual, a meta é separar ${regra.investimentos}% da renda.`,
        });
    }

    if (
        percentualFixos <= regra.fixos &&
        percentualFlexiveis <= regra.flexiveis &&
        percentualInvestimentos >= regra.investimentos
    ) {
        recomendacoes.push({
            titulo: "Mantenha o equilíbrio",
            tipo: "positiva",
            descricao: `A distribuição dos gastos está alinhada com a regra ${regra.fixos}/${regra.flexiveis}/${regra.investimentos}.`,
            destaque:
                "Continue acompanhando as categorias para preservar sua saúde financeira.",
        });
    }

    const maiorFlexivel = Object.entries(totalPorCategoria)
        .filter(([categoria]) => categoriasFlexiveis.includes(categoria))
        .reduce(
            (acumulador, item) => {
                if (item[1] > acumulador[1]) {
                    return item;
                }

                return acumulador;
            },
            ["", 0],
        );

    if (percentualFlexiveis > regra.flexiveis && maiorFlexivel[0] === "compras") {
        recomendacoes.push({
            titulo: "Ajuste gastos não essenciais",
            tipo: "negativa",
            descricao:
                "Compras tem o maior peso entre os gastos flexíveis.",
            destaque:
                "Revise compras por impulso e defina um teto para esse tipo de consumo.",
        });
    } else if (
        percentualFlexiveis > regra.flexiveis &&
        maiorFlexivel[0] === "assinaturas"
    ) {
        recomendacoes.push({
            titulo: "Revise suas assinaturas",
            tipo: "negativa",
            descricao:
                "Assinaturas tem o maior peso entre os gastos flexíveis.",
            destaque:
                "Cancele ou pause serviços pouco usados para liberar parte da renda.",
        });
    } else if (
        percentualFlexiveis > regra.flexiveis &&
        maiorFlexivel[0] === "lazer"
    ) {
        recomendacoes.push({
            titulo: "Planeje seus gastos com lazer",
            tipo: "negativa",
            descricao:
                "Lazer tem o maior peso entre os gastos flexíveis.",
            destaque:
                "Defina um teto semanal para passeios, eventos e momentos de entretenimento.",
        });
    } else if (
        percentualFlexiveis > regra.flexiveis &&
        maiorFlexivel[0] === "cuidados_pessoais"
    ) {
        recomendacoes.push({
            titulo: "Organize cuidados pessoais",
            tipo: "negativa",
            descricao:
                "Cuidados pessoais tem o maior peso entre os gastos flexíveis.",
            destaque:
                "Defina um orçamento mensal para manter esse gasto sob controle.",
        });
    }

    const resumoRegraFinanceira = {
        fixos: {
            total: totalFixos,
            limite: limiteFixos,
            percentual: percentualFixos,
            dentro: percentualFixos <= regra.fixos,
        },
        flexiveis: {
            total: totalFlexiveis,
            limite: limiteFlexiveis,
            percentual: percentualFlexiveis,
            dentro: percentualFlexiveis <= regra.flexiveis,
        },
        investimentos: {
            total: totalInvestimentos,
            meta: metaInvestimentos,
            percentual: percentualInvestimentos,
            dentro: percentualInvestimentos >= regra.investimentos,
        },
        saldoRestante,
        regra,
    };

    return {
        insights,
        recomendacoes,
        resumoRegraFinanceira,
        resumoRegra503020: resumoRegraFinanceira,
    };
}
