import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { GoGear, GoBell,  GoMoon, GoSun } from "react-icons/go";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Header = () => {
    // cria o estado e verifica se o usuário já tinha salvo o tema

    const { user } = useContext(AuthContext);

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("consuman-theme");
        return savedTheme ? savedTheme : "light";
    });

    // essa funçao é executada toda vez que o tema mudar
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("consuman-theme", theme);
    }, [theme]);

    // funçao para o botão alternar os temas
    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light",
        );
    };

    const checkActiveLink = ({ isActive }) => {
        return isActive
            ? `${styles.menuItem} ${styles.menuItemActive}`
            : styles.menuItem;
    };

    return (
        <header className={styles.header}>
            <img src="logo.png" alt="Logo" className={styles.logo} />
            <nav className={styles.menu}>
                <NavLink to="/" className={checkActiveLink}>
                    Visão geral
                </NavLink>
                <NavLink to="/transcacoes" className={checkActiveLink}>
                    Transações
                </NavLink>
                <NavLink to="/categorias" className={checkActiveLink}>
                    Categorias
                </NavLink>
                <NavLink to="/insights" className={checkActiveLink}>
                    Insights
                </NavLink>
            </nav>
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
        </header>
    );
};
