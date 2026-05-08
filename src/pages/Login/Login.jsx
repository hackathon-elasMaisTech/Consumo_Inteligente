import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoMoon, GoSun } from "react-icons/go";
import { AuthContext } from "../../context/AuthContext";
import { authenticateUser } from "../../utils/authStorage";
import "./login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("lumi-theme") === "dark",
    );
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const userData = authenticateUser(email, senha);

            if (!userData) {
                alert("Email ou senha inválidos");
                return;
            }

            login(userData);
            navigate("/home");
        } catch (error) {
            console.error("Erro no login:", error);
            alert("Erro ao fazer login");
        } finally {
            setLoading(false);
        }
    }

    function toggleTheme() {
        const newTheme = !darkMode;

        setDarkMode(newTheme);

        document.documentElement.setAttribute(
            "data-theme",
            newTheme ? "dark" : "light",
        );
        localStorage.setItem("lumi-theme", newTheme ? "dark" : "light");
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
                        <h1>Entrar na sua conta</h1>
                        <p>
                            Organize seus gastos e acompanhe seus insights
                            financeiros.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
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

                        <button type="submit" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>

                    <span className="login-link">
                        Não tem conta?
                        <Link to="/cadastroLogin"> Criar conta</Link>
                    </span>
                </div>
            </section>
        </main>
    );
}

export default Login;
