import { analisarPerfil } from "./analisePerfil.js";

export function analisarConsumo(consumos) {
  const despesas = consumos.filter((item) => item.tipo === "despesa");
  const receitas = consumos.filter((item) => item.tipo === "receita");

  const totalPorCategoria = despesas.reduce((acumulador, item) => {
    if (!acumulador[item.categoria]) {
      acumulador[item.categoria] = 0;
    }

    acumulador[item.categoria] = acumulador[item.categoria] + item.valor;
    return acumulador;
  }, {});

  const totalGeral = Object.values(totalPorCategoria).reduce((acumulador, valor) => {
    return acumulador + valor;
  }, 0);

  const totalReceitas = receitas.reduce((acumulador, item) => {
    return acumulador + item.valor;
  }, 0);

  const saldoRestante = totalReceitas - totalGeral;

  const percentuais = Object.keys(totalPorCategoria).reduce((acumulador, categoria) => {
    acumulador[categoria] = totalGeral === 0
      ? 0
      : (totalPorCategoria[categoria] / totalGeral) * 100;
    return acumulador;
  }, {});

  const categoriasConsumo = Object.entries(totalPorCategoria)
    .map(([categoria, valor]) => ({
      categoria,
      valor,
      percentual: Number(percentuais[categoria].toFixed(2))
    }))
    .sort((a, b) => b.valor - a.valor);

  const categoriaDominante = Object.entries(percentuais).reduce((acumulador, item) => {
    if (item[1] > acumulador[1]) {
      return item;
    }

    return acumulador;
  }, ["", 0]);

  const nomeDominante = categoriaDominante[0];
  const percentualDominante = categoriaDominante[1];
  const perfil = analisarPerfil(totalReceitas, totalPorCategoria);

  if (!nomeDominante) {
    return {
      totalPorCategoria,
      totalGeral,
      percentuais,
      categoriasConsumo,
      insightCategoriaDominante: null,
      insights: perfil.insights,
      recomendacoes: perfil.recomendacoes,
      resumoRegra503020: perfil.resumoRegra503020
    };
  }

  return {
    totalPorCategoria,
    totalGeral,
    percentuais,
    categoriasConsumo,
    insightCategoriaDominante: {
      titulo: "Categoria dominante",
      mensagem: `A categoria dominante e ${nomeDominante} com ${percentualDominante.toFixed(2)}% dos gastos.`,
      categoria: nomeDominante,
      percentual: Number(percentualDominante.toFixed(2))
    },
    insights: perfil.insights,
    recomendacoes: perfil.recomendacoes,
    resumoRegra503020: perfil.resumoRegra503020
  };
}
