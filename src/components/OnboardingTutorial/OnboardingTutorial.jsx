import { useState } from "react";
import {
    GoBell,
    GoCalendar,
    GoCheck,
    GoGear,
    GoPlus,
} from "react-icons/go";
import styles from "./OnboardingTutorial.module.css";

const slides = [
    {
        titulo: "Acompanhe seu resumo financeiro",
        descricao:
            "Na visão geral, você vê receitas, despesas, saldo atual e a categoria que mais impacta seus gastos.",
        tipo: "resumo",
    },
    {
        titulo: "Registre receitas e gastos",
        descricao:
            "Use Nova Transação para cadastrar entradas, despesas, investimentos ou reservas por categoria.",
        tipo: "transacao",
    },
    {
        titulo: "Filtre para analisar melhor",
        descricao:
            "Use os filtros de tipo, categoria e período para visualizar apenas os lançamentos que importam naquele momento.",
        tipo: "filtros",
    },
    {
        titulo: "Revise seus lançamentos",
        descricao:
            "A lista mostra tudo que foi registrado, separando valores de entrada e saída para facilitar a conferência.",
        tipo: "lista",
    },
    {
        titulo: "Personalize sua regra financeira",
        descricao:
            "Na engrenagem, defina seus limites para gastos fixos, gastos flexíveis e investimentos.",
        tipo: "regra",
    },
    {
        titulo: "Acompanhe seus alertas",
        descricao:
            "O sino mostra avisos quando seus gastos ultrapassam os limites configurados.",
        tipo: "alertas",
    },
];

export const OnboardingTutorial = ({ isOpen, onClose }) => {
    const [slideAtual, setSlideAtual] = useState(0);

    if (!isOpen) return null;

    const slide = slides[slideAtual];
    const ultimoSlide = slideAtual === slides.length - 1;

    const avancar = () => {
        if (ultimoSlide) {
            onClose();
            return;
        }

        setSlideAtual((slide) => slide + 1);
    };

    const voltar = () => {
        setSlideAtual((slide) => Math.max(slide - 1, 0));
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <section className={styles.container}>
                <div className={styles.preview}>
                    <SlidePreview tipo={slide.tipo} />
                </div>

                <div className={styles.content}>
                    <span className={styles.step}>
                        {slideAtual + 1} de {slides.length}
                    </span>

                    <h2>{slide.titulo}</h2>
                    <p>{slide.descricao}</p>

                    <div className={styles.dots} aria-label="Passos do tutorial">
                        {slides.map((item, index) => (
                            <button
                                type="button"
                                key={item.titulo}
                                className={
                                    index === slideAtual
                                        ? styles.dotActive
                                        : styles.dot
                                }
                                onClick={() => setSlideAtual(index)}
                                aria-label={`Ir para o passo ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={slideAtual === 0 ? onClose : voltar}
                        >
                            {slideAtual === 0 ? "Pular" : "Voltar"}
                        </button>

                        <button
                            type="button"
                            className={styles.primaryButton}
                            onClick={avancar}
                        >
                            {ultimoSlide ? "Começar" : "Próximo"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const SlidePreview = ({ tipo }) => {
    if (tipo === "resumo") {
        return (
            <div className={styles.mockDashboard}>
                <div className={styles.mockHeader}>
                    <img
                        src={`${import.meta.env.BASE_URL}logo-horizontal-light.svg`}
                        alt="Logo da Lumi"
                        className={styles.mockLogo}
                    />
                    <span className={styles.mockAvatar}>M</span>
                </div>
                <div className={styles.mockCards}>
                    <div>
                        <small>Receitas</small>
                        <strong>R$ 4.000</strong>
                    </div>
                    <div>
                        <small>Despesas</small>
                        <strong className={styles.highlight}>R$ 1.500</strong>
                    </div>
                    <div>
                        <small>Saldo atual</small>
                        <strong>R$ 2.500</strong>
                    </div>
                    <div>
                        <small>Categoria</small>
                        <strong>Moradia</strong>
                    </div>
                </div>
            </div>
        );
    }

    if (tipo === "transacao") {
        return (
            <div className={styles.mockPanel}>
                <div className={styles.mockPanelHeader}>
                    <button className={styles.mockAction} type="button">
                        <GoPlus />
                        Nova Transação
                    </button>
                </div>
                <div className={styles.mockForm}>
                    <div className={styles.mockToggle}>
                        <span className={styles.mockToggleActive}>Despesa</span>
                        <span>Receita</span>
                    </div>
                    <label>
                        Nome da Transação
                        <span>Aluguel</span>
                    </label>
                    <label>
                        Valor
                        <span>R$ 1.500,00</span>
                    </label>
                    <label>
                        Categoria
                        <span>Moradia</span>
                    </label>
                    <button type="button">Cadastrar</button>
                </div>
            </div>
        );
    }

    if (tipo === "filtros") {
        return (
            <div className={styles.mockFilters}>
                <div>
                    <small>Tipo de Transação</small>
                    <div className={styles.filterButtons}>
                        <span className={styles.filterActive}>Todos</span>
                        <span>Receita</span>
                        <span>Despesa</span>
                    </div>
                </div>
                <div>
                    <small>Filtrar por Categoria</small>
                    <span className={styles.mockSelect}>Todas as categorias</span>
                </div>
                <div className={styles.mockPeriod}>
                    <GoCalendar />
                    Selecionar Período
                </div>
            </div>
        );
    }

    if (tipo === "lista") {
        return (
            <div className={styles.mockList}>
                <strong>Lista de Consumos</strong>
                <div>
                    <span>
                        <b>Salário</b>
                        <small>Salário</small>
                    </span>
                    <em className={styles.income}>+ R$ 4.000</em>
                </div>
                <div>
                    <span>
                        <b>Aluguel</b>
                        <small>Moradia</small>
                    </span>
                    <em className={styles.expense}>- R$ 1.500</em>
                </div>
                <div>
                    <span>
                        <b>Reserva</b>
                        <small>Investimento</small>
                    </span>
                    <em className={styles.expense}>- R$ 200</em>
                </div>
            </div>
        );
    }

    if (tipo === "regra") {
        return (
            <div className={styles.mockRule}>
                <div className={styles.ruleTitle}>
                    <GoGear />
                    Regra financeira
                </div>
                <p>
                    Ajuste como deseja distribuir sua renda entre gastos fixos,
                    flexíveis e investimentos.
                </p>
                <MockSlider label="Gastos fixos" value={50} />
                <MockSlider label="Gastos flexíveis" value={30} />
                <MockSlider label="Investimentos" value={20} />
                <div className={styles.mockRuleActions}>
                    <button type="button">Restaurar padrão</button>
                    <button type="button">Salvar</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.mockNotifications}>
            <div className={styles.notificationTop}>
                <GoBell />
                <span>1</span>
            </div>
            <div className={styles.notificationCard}>
                <strong>Gastos flexíveis acima do limite</strong>
                <p>
                    Seus gastos flexíveis chegaram a 125% da renda, acima do
                    limite de 30%.
                </p>
                <GoCheck />
            </div>
        </div>
    );
};

const MockSlider = ({ label, value }) => (
    <div className={styles.mockSlider}>
        <div>
            <span>{label}</span>
            <strong>{value}%</strong>
        </div>
        <input
            type="range"
            min="0"
            max="100"
            value={value}
            readOnly
            aria-label={label}
            style={{ "--slider-percent": `${value}%` }}
        />
    </div>
);
