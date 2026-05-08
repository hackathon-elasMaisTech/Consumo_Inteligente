import styles from "./Header.module.css";

import { GoGear, GoBell, GoMoon, GoSun } from "react-icons/go";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Header = ({ onOpenConfig }) => {
    const { user, logout } = useContext(AuthContext);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
                    >
                        {theme === "light" ? <GoMoon /> : <GoSun />}
                    </button>

                    <button
                        className={`${styles.button} ${styles.iconsAccountMenu}`}
                        onClick={onOpenConfig}
                        type="button"
                        aria-label="Configurar regra financeira"
                    >
                        <GoGear />
                    </button>

                    <button
                        className={`${styles.button} ${styles.iconsAccountMenu}`}
                    >
                        <GoBell />
                    </button>

                    {/* avatar */}
                    <div className={styles.userMenu}>
                        <button
                            className={styles.avatarFallback}
                            onClick={() =>
                                setIsUserMenuOpen((isOpen) => !isOpen)
                            }
                            aria-label="Abrir menu do usuário"
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
