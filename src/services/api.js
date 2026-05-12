const STORAGE_PREFIX = "lumi_consumos";

const consumosIniciais = [
    {
        id: "demo-1",
        nome: "Salario",
        valor: 4500,
        categoria: "salario",
        tipo: "receita",
        data: "2026-05-05",
        dataUser: "2026-05-05",
    },
    {
        id: "demo-2",
        nome: "Pix",
        valor: 50,
        categoria: "outros",
        tipo: "receita",
        data: "2026-05-04",
        dataUser: "2026-05-04",
    },
    {
        id: "demo-3",
        nome: "Aluguel",
        valor: 1200,
        categoria: "moradia",
        tipo: "despesa",
        data: "2026-05-06",
        dataUser: "2026-05-06",
    },
    {
        id: "demo-4",
        nome: "Bar",
        valor: 90,
        categoria: "lazer",
        tipo: "despesa",
        data: "2026-05-05",
        dataUser: "2026-05-05",
    },
    {
        id: "demo-5",
        nome: "Show",
        valor: 345,
        categoria: "lazer",
        tipo: "despesa",
        data: "2026-05-07",
        dataUser: "2026-05-07",
    },
    {
        id: "demo-6",
        nome: "Investimento CDB",
        valor: 200,
        categoria: "investimento",
        tipo: "despesa",
        data: "2026-05-08",
        dataUser: "2026-05-08",
    },
    {
        id: "demo-7",
        nome: "Poupancudos da Caixa",
        valor: 150,
        categoria: "reserva",
        tipo: "despesa",
        data: "2026-05-08",
        dataUser: "2026-05-08",
    },
];

const obterEmailUsuario = () => {
    const usuario = localStorage.getItem("user");

    if (!usuario) {
        return "visitante";
    }

    try {
        return JSON.parse(usuario).email || "visitante";
    } catch {
        return "visitante";
    }
};

const obterChaveStorage = () => {
    const email = obterEmailUsuario().toLowerCase();

    return `${STORAGE_PREFIX}_${email}`;
};

const salvarConsumos = (consumos) => {
    localStorage.setItem(obterChaveStorage(), JSON.stringify(consumos));
};

const carregarConsumos = () => {
    const chave = obterChaveStorage();
    const consumosSalvos = localStorage.getItem(chave);

    if (consumosSalvos) {
        try {
            return JSON.parse(consumosSalvos);
        } catch {
            localStorage.removeItem(chave);
        }
    }

    localStorage.setItem(chave, JSON.stringify(consumosIniciais));
    return consumosIniciais;
};

const gerarId = () => {
    if (globalThis.crypto?.randomUUID) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const getConsumos = async () => carregarConsumos();

export const createConsumo = async (data) => {
    const consumos = carregarConsumos();
    const novoConsumo = {
        ...data,
        id: gerarId(),
    };

    salvarConsumos([novoConsumo, ...consumos]);
    return novoConsumo;
};

export const deleteConsumo = async (id) => {
    const consumos = carregarConsumos();
    const consumosAtualizados = consumos.filter((consumo) => consumo.id !== id);

    salvarConsumos(consumosAtualizados);
    return true;
};

export const updateConsumo = async (id, data) => {
    const consumos = carregarConsumos();
    const consumosAtualizados = consumos.map((consumo) =>
        consumo.id === id ? { ...consumo, ...data, id } : consumo,
    );

    salvarConsumos(consumosAtualizados);
    return consumosAtualizados.find((consumo) => consumo.id === id) || null;
};
