import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import { GoGear, GoBell, GoMoon, GoSun } from "react-icons/go";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Header = () => {
    const { user } = useContext(AuthContext);

    // tema salvo
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("consuman-theme");
        return savedTheme ? savedTheme : "light";
    });

    // aplica tema
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("consuman-theme", theme);
    }, [theme]);

    // alternar tema
    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light",
        );
    };

    // link ativo
    const checkActiveLink = ({ isActive }) => {
        return isActive
            ? `${styles.menuItem} ${styles.menuItemActive}`
            : styles.menuItem;
    };

    return (
        <header className={styles.header}>
            {/* logo */}
            <div className={styles.headerWrapped}>
                <img
                    src={`${import.meta.env.BASE_URL}logo.png`}
                    alt="Logo do Consuman"
                    className={styles.logo}
                />

                {/* menu */}
                <nav className={styles.menu}>
                    <NavLink to="/" className={checkActiveLink}>
                        Visão geral
                    </NavLink>

                    <NavLink to="/transacoes" className={checkActiveLink}>
                        Transações
                    </NavLink>

                    <NavLink to="/categorias" className={checkActiveLink}>
                        Categorias
                    </NavLink>

                    <NavLink to="/insights" className={checkActiveLink}>
                        Insights
                    </NavLink>
                </nav>

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
                    >
                        <GoGear />
                    </button>

                    <button
                        className={`${styles.button} ${styles.iconsAccountMenu}`}
                    >
                        <GoBell />
                    </button>

                    {/* avatar */}
                    <div className={styles.avatarFallback}>
                        {user?.nome?.charAt(0).toUpperCase() || "U"}
                    </div>
                </div>
            </div>
        </header>
    );
};
