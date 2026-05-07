import { GoPlus, GoCalendar } from "react-icons/go";
import styles from "./MainHeader.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const MainHeader = () => {
    const { user } = useContext(AuthContext);

    // ⏰ horário atual
    const hora = new Date().getHours();

    let saudacao;

    if (hora >= 5 && hora < 12) {
        saudacao = "☀️ Bom dia";
    } else if (hora >= 12 && hora < 18) {
        saudacao = "🌤️ Boa tarde";
    } else {
        saudacao = "🌙 Boa noite";
    }

    return (
        <div className={styles.container}>

            {/* 👤 usuário */}
            <div className={styles.userInfo}>

               
                {/* saudação */}
                <h1 className={styles.h1}>
                    {saudacao}, {user?.nome || "Usuário"}!
                </h1>

            </div>

            {/* botões */}
            <div className={styles.btnWrapped}>

                <button className={styles.button}>
                    <GoPlus className={styles.iconButton} />
                    Nova Transação
                </button>

                <button className={styles.button}>
                    <GoCalendar className={styles.iconButton} />
                    Selecionar Período
                </button>

            </div>
        </div>
    );
};