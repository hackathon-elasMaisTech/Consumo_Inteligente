export function analisarPerfil(totalReceitas, totalPorCategoria) {
    const categoriasNecessidades = [
        "mercado",
        "transporte",
        "contas",
        "moradia",
        "saude",
    ];
    const categoriasDesejos = [
        "lazer",
        "cuidados_pessoais",
        "compras",
        "assinaturas",
    ];

    const totalNecessidades = Object.entries(totalPorCategoria).reduce(
        (total, [categoria, valor]) => {
            if (categoriasNecessidades.includes(categoria)) {
                return total + valor;
            }

            return total;
        },
        0,
    );

    const totalDesejos = Object.entries(totalPorCategoria).reduce(
        (total, [categoria, valor]) => {
            if (categoriasDesejos.includes(categoria)) {
                return total + valor;
            }

            return total;
        },
        0,
    );

    const despesaTotal = totalNecessidades + totalDesejos;
    const saldoRestante = totalReceitas - despesaTotal;
    const limiteNecessidades = totalReceitas * 0.5;
    const limiteDesejos = totalReceitas * 0.3;
    const metaReserva = totalReceitas * 0.2;
    const percentualNecessidades =
        totalReceitas === 0
            ? 0
            : Number(((totalNecessidades / totalReceitas) * 100).toFixed(2));
    const percentualDesejos =
        totalReceitas === 0
            ? 0
            : Number(((totalDesejos / totalReceitas) * 100).toFixed(2));
    const percentualReserva =
        totalReceitas === 0
            ? 0
            : Number(((saldoRestante / totalReceitas) * 100).toFixed(2));
    const faltaParaReserva = Number((metaReserva - saldoRestante).toFixed(2));

    let descricaoNecessidades;
    let descricaoDesejos;
    let descricaoReserva;

    if (percentualNecessidades > 50) {
        descricaoNecessidades =
            "Seus gastos essenciais passaram do limite de 50% da renda.";
    } else {
        descricaoNecessidades =
            "Seus gastos essenciais estão dentro do limite recomendado de 50% da renda.";
    }

    if (percentualDesejos > 30) {
        descricaoDesejos =
            "Seus gastos flexíveis passaram do limite recomendado de 30% da renda.";
    } else {
        descricaoDesejos =
            "Seus gastos flexíveis estão dentro do limite recomendado de 30% da renda.";
    }

    if (percentualReserva >= 20) {
        descricaoReserva =
            "Você alcançou a meta de 20% para reserva ou objetivos financeiros.";
    } else {
        descricaoReserva = `Sua margem está abaixo da meta de 20%. Faltam R$ ${faltaParaReserva.toFixed(2)} para atingir a reserva recomendada.`;
    }

    const insights = [
        {
            titulo: "Gastos essenciais",
            valor: `${Math.round(percentualNecessidades)}% da renda`,
            descricao: descricaoNecessidades,
        },
        {
            titulo: "Gastos flexíveis",
            valor: `${Math.round(percentualDesejos)}% da renda`,
            descricao: descricaoDesejos,
        },
        {
            titulo: "Capacidade de reserva",
            valor: `${Math.round(percentualReserva)}% da renda`,
            descricao: descricaoReserva,
        },
    ];

    const recomendacoes = [];

    if (percentualNecessidades > 50) {
        recomendacoes.push({
            titulo: "Revise gastos essenciais",
            descricao:
                "Seus gastos essenciais ultrapassaram 50% da renda. Avalie despesas como mercado, moradia, contas e transporte para encontrar possíveis ajustes.",
        });
    }

    if (percentualDesejos > 30) {
        recomendacoes.push({
            titulo: "Reduza gastos flexíveis",
            descricao:
                "Seus gastos flexíveis ultrapassaram 30% da renda. Defina limites para compras, lazer, cuidados pessoais e assinaturas.",
        });
    }

    if (percentualReserva >= 20) {
        recomendacoes.push({
            titulo: "Aproveite sua margem",
            descricao:
                "Você alcançou a meta de 20% de saldo disponível. Considere direcionar essa margem para reserva de emergência ou objetivos financeiros.",
        });
    } else {
        recomendacoes.push({
            titulo: "Priorize sua reserva",
            descricao:
                "Sua margem disponível está abaixo de 20% da renda. Tente separar uma parte da receita logo ao receber e reduzir gastos variáveis.",
        });
    }

    if (
        percentualNecessidades <= 50 &&
        percentualDesejos <= 30 &&
        percentualReserva >= 20
    ) {
        recomendacoes.push({
            titulo: "Mantenha o equilíbrio",
            descricao:
                "Seus gastos estão alinhados com a regra 50/30/20. Continue acompanhando as categorias para preservar sua saúde financeira.",
        });
    }

    const maiorDesejo = Object.entries(totalPorCategoria)
        .filter(([categoria]) => categoriasDesejos.includes(categoria))
        .reduce(
            (acumulador, item) => {
                if (item[1] > acumulador[1]) {
                    return item;
                }

                return acumulador;
            },
            ["", 0],
        );

    if (maiorDesejo[0] === "compras") {
        recomendacoes.push({
            titulo: "Ajuste gastos não essenciais",
            descricao:
                "Compras é a categoria flexível com maior gasto. Revise compras por impulso e defina um teto para esse tipo de consumo.",
        });
    } else if (maiorDesejo[0] === "assinaturas") {
        recomendacoes.push({
            titulo: "Revise suas assinaturas",
            descricao:
                "Assinaturas é a categoria flexível com maior impacto. Cancele ou pause serviços pouco usados para liberar parte da renda.",
        });
    } else if (maiorDesejo[0] === "lazer") {
        recomendacoes.push({
            titulo: "Planeje seus gastos com lazer",
            descricao:
                "Lazer é a categoria flexível com maior impacto. Defina um teto semanal para passeios, eventos e momentos de entretenimento.",
        });
    } else if (maiorDesejo[0] === "cuidados_pessoais") {
        recomendacoes.push({
            titulo: "Organize cuidados pessoais",
            descricao:
                "Cuidados pessoais é a categoria flexível com maior impacto. Defina um orçamento mensal para manter esse gasto sob controle.",
        });
    }

    const resumoRegra503020 = {
        necessidades: {
            total: totalNecessidades,
            limite: limiteNecessidades,
            percentual: percentualNecessidades,
            dentro: percentualNecessidades <= 50,
        },
        desejos: {
            total: totalDesejos,
            limite: limiteDesejos,
            percentual: percentualDesejos,
            dentro: percentualDesejos <= 30,
        },
        reserva: {
            total: saldoRestante,
            meta: metaReserva,
            percentual: percentualReserva,
            dentro: percentualReserva >= 20,
        },
    };

    return {
        insights,
        recomendacoes,
        resumoRegra503020,
    };
}
