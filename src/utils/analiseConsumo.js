import { analisarPerfil } from "./analisePerfil.js";

export function analisarConsumo(consumos, regra) {
  const categoriasInvestimentos = ["investimento", "reserva"];
  const despesas = consumos.filter(
    (item) =>
      item.tipo === "despesa" ||
      categoriasInvestimentos.includes(item.categoria),
  );
  const receitas = consumos.filter(
    (item) =>
      item.tipo === "receita" &&
      !categoriasInvestimentos.includes(item.categoria),
  );

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

  const perfil = analisarPerfil(totalReceitas, totalPorCategoria, regra);

  return {
    totalPorCategoria,
    totalGeral,
    percentuais,
    categoriasConsumo,
    investimentos: perfil.resumoRegraFinanceira.investimentos,
    insights: perfil.insights,
    recomendacoes: perfil.recomendacoes,
    resumoRegraFinanceira: perfil.resumoRegraFinanceira,
    resumoRegra503020: perfil.resumoRegra503020
  };
}
