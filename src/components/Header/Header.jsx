import styles from "./Header.module.css";
import { GoPerson, GoMoon, GoSun } from "react-icons/go";
import { useEffect, useState } from "react";

export const Header = () => {
    // cria o estado e verifica se o usuário já tinha salvo o tema
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

    return (
        <header className={styles.header}>
            <img
                src="/logo.png"
                alt="Logo do Consuman"
                className={styles.logo}
            />
            <div className={styles.accountMenu}>
                <button
                    onClick={toggleTheme}
                    className={`${styles.button} ${styles.themeToggleBtn}`}
                >
                    {theme === "light" ? <GoMoon /> : <GoSun />}
                </button>
                <button className={`${styles.button} ${styles.avatar}`}>
                    <GoPerson />
                </button>
            </div>
        </header>
    );
};
