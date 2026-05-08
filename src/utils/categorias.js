export const CATEGORIAS_DESPESA_FIXA = [
    "mercado",
    "transporte",
    "contas",
    "moradia",
    "saude",
    "educacao",
];

export const CATEGORIAS_DESPESA_FLEXIVEL = [
    "lazer",
    "cuidados_pessoais",
    "compras",
    "assinaturas",
    "outros",
];

export const CATEGORIAS_INVESTIMENTO = ["investimento", "reserva"];

export const CATEGORIAS_DESPESA = [
    ...CATEGORIAS_DESPESA_FIXA,
    ...CATEGORIAS_DESPESA_FLEXIVEL,
    ...CATEGORIAS_INVESTIMENTO,
];

export const CATEGORIAS_RECEITA = ["salario", "freelance", "outros"];

export const NOME_CATEGORIAS = {
    // despesas fixas
    mercado: "Mercado",
    transporte: "Transporte",
    contas: "Contas",
    moradia: "Moradia",
    saude: "Saúde",
    educacao: "Educação",

    // despesas flexiveis
    lazer: "Lazer e Diversão",
    cuidados_pessoais: "Cuidados Pessoais",
    compras: "Compras",
    assinaturas: "Assinaturas",
    outros: "Outros",

    // despesas investimentos
    investimento: "Investimento",
    reserva: "Reserva de Emergência",

    // receitas
    salario: "Salário",
    freelance: "Freelance",
};
