import styles from "./Header.module.css";

import { GoGear, GoBell, GoMoon, GoSun } from "react-icons/go";

import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Header = ({
    onOpenConfig,
    notificacoes = [],
    onClearNotificacoes,
    onReadNotificacao = () => {},
}) => {
    const { user, logout } = useContext(AuthContext);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationMenuRef = useRef(null);
    const navigate = useNavigate();

    // tema salvo
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("lumi-theme");
        return savedTheme ? savedTheme : "light";
    });

    // aplica tema
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("lumi-theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationMenuRef.current &&
                !notificationMenuRef.current.contains(event.target)
            ) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // alternar tema
    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light",
        );
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className={styles.header}>
            {/* logo */}
            <div className={styles.headerWrapped}>
                <img
                    src={`${import.meta.env.BASE_URL}${theme === "light" ? "logo-horizontal-light.svg" : "logo-horizontal-dark.svg"}`}
                    alt="Logo da Lumi"
                    className={styles.logo}
                />

                {/* ações */}
                <div className={styles.accountMenu}>
                    <button
                        onClick={toggleTheme}
                        className={`${styles.button} ${styles.themeToggleBtn}`}
                        aria-label="Alternar tema"
                        title="Alternar tema"
                    >
                        {theme === "light" ? <GoMoon /> : <GoSun />}
                    </button>

                    <button
                        className={`${styles.button} ${styles.iconsAccountMenu}`}
                        onClick={onOpenConfig}
                        type="button"
                        aria-label="Configurar regra financeira"
                        title="Regra financeira"
                    >
                        <GoGear />
                    </button>

                    <div
                        className={styles.notificationMenu}
                        ref={notificationMenuRef}
                    >
                        <button
                            className={`${styles.button} ${styles.iconsAccountMenu}`}
                            onClick={() => {
                                setIsUserMenuOpen(false);
                                setIsNotificationsOpen((isOpen) => !isOpen);
                            }}
                            type="button"
                            aria-label="Abrir notificações"
                            title="Notificações"
                        >
                            <GoBell />
                            {notificacoes.length > 0 && (
                                <span className={styles.notificationBadge}>
                                    {notificacoes.length}
                                </span>
                            )}
                        </button>

                        {isNotificationsOpen && (
                            <div className={styles.notificationDropdown}>
                                <div className={styles.notificationHeader}>
                                    <strong>Notificações</strong>
                                    {notificacoes.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={onClearNotificacoes}
                                        >
                                            Limpar
                                        </button>
                                    )}
                                </div>

                                {notificacoes.length === 0 ? (
                                    <p className={styles.emptyNotifications}>
                                        Nenhuma notificação no momento.
                                    </p>
                                ) : (
                                    <div className={styles.notificationList}>
                                        {notificacoes.map((notificacao) => (
                                            <div
                                                className={
                                                    styles.notificationItem
                                                }
                                                key={notificacao.id}
                                            >
                                                <strong>
                                                    {notificacao.titulo}
                                                </strong>
                                                <p>{notificacao.mensagem}</p>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onReadNotificacao(
                                                            notificacao.id,
                                                        )
                                                    }
                                                >
                                                    Marcar como lida
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* avatar */}
                    <div className={styles.userMenu}>
                        <button
                            className={styles.avatarFallback}
                            onClick={() => {
                                setIsNotificationsOpen(false);
                                setIsUserMenuOpen((isOpen) => !isOpen);
                            }}
                            aria-label="Abrir menu do usuário"
                            title="Menu do usuário"
                            type="button"
                        >
                            {user?.nome?.charAt(0).toUpperCase() || "U"}
                        </button>

                        {isUserMenuOpen && (
                            <div className={styles.logoutMenu}>
                                <button onClick={handleLogout} type="button">
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
