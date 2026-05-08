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
