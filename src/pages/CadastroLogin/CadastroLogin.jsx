import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CadastroLogin.css";

function CadastroLogin() {
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function toggleTheme() {
        const newTheme = !darkMode;

        setDarkMode(newTheme);

        document.documentElement.setAttribute(
            "data-theme",
            newTheme ? "dark" : "light"
        );
    }

    function handleCadastro(e) {
        e.preventDefault();

        // simulação de cadastro
        alert("Conta criada com sucesso!");

        // volta para login
        navigate("/");
    }

    return (
        <div className="login-container">

            <button className="theme-toggle" onClick={toggleTheme}>
                {darkMode ? "☀️" : "🌙"}
            </button>

            <div className="login-card">

                {/* ESQUERDA */}
                <div className="login-content">

                    

                    <h1>Criar Conta</h1>

                    <p>
                        Organize suas finanças de forma simples e inteligente.
                    </p>

                    <form
                        onSubmit={handleCadastro}
                        className="login-form"
                    >

                        <input
                            type="text"
                            placeholder="Seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />

                        <button type="submit">
                            Criar Conta
                        </button>
                    </form>

                    <span className="login-link">
                        Já tem uma conta?
                        <Link to="/"> Entrar</Link>
                    </span>
                </div>

                {/* DIREITA */}
                <div className="login-image">
                    <img
                        src={`${import.meta.env.BASE_URL}logo.png`}
                        alt="Consuman Logo"
                    />
                </div>
            </div>
        </div>
    );
}

export default CadastroLogin;
