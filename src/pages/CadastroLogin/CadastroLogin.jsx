import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoMoon, GoSun } from "react-icons/go";
import { createUser } from "../../utils/authStorage";
import "../Login/login.css";
import "./CadastroLogin.css";

function CadastroLogin() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("lumi-theme") === "dark",
    );
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function toggleTheme() {
        const newTheme = !darkMode;

        setDarkMode(newTheme);

        document.documentElement.setAttribute(
            "data-theme",
            newTheme ? "dark" : "light",
        );
        localStorage.setItem("lumi-theme", newTheme ? "dark" : "light");
    }

    function handleCadastro(e) {
        e.preventDefault();

        const newUser = createUser({ nome, email, senha });

        if (!newUser) {
            alert("Este email já está cadastrado");
            return;
        }

        alert("Conta criada com sucesso!");
        navigate("/");
    }

    return (
        <main className="minimal-login login-container">
            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Alternar tema"
                type="button"
            >
                {darkMode ? <GoSun /> : <GoMoon />}
            </button>

            <section className="login-card">
                <img
                    className="login-brand"
                    src={`${import.meta.env.BASE_URL}${
                        darkMode
                            ? "logo-horizontal-dark.svg"
                            : "logo-horizontal-light.svg"
                    }`}
                    alt="Logo da Lumi"
                />

                <div className="login-content">
                    <div className="login-heading">
                        <h1>Criar conta</h1>
                        <p>
                            Comece a acompanhar seus gastos com uma conta
                            simples de demonstração.
                        </p>
                    </div>

                    <form onSubmit={handleCadastro} className="login-form">
                        <label>
                            Nome
                            <input
                                type="text"
                                placeholder="Seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Email
                            <input
                                type="email"
                                placeholder="Seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Senha
                            <input
                                type="password"
                                placeholder="Sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </label>

                        <button type="submit">Criar conta</button>
                    </form>

                    <span className="login-link">
                        Já tem uma conta?
                        <Link to="/"> Entrar</Link>
                    </span>
                </div>
            </section>
        </main>
    );
}

export default CadastroLogin;
