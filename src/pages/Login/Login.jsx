import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [nome, setNome] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
 

  async function handleSubmit(e) {
  e.preventDefault();

  setLoading(true);

  try {

    // simula usuário autenticado
 
    const userData = {
  nome,
  email,
  token: "fake-token-123"
};

    // salva no contexto
    login(userData);

    // redireciona
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
      newTheme ? "dark" : "light"
    );
  }

  return (
    <div className="login-container">

      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="login-card">

        {/* esquerda */}
        <div className="login-content">
        

          <h2>Bem-vindo!</h2>

          <p>
            Seu assistente de gestão financeira
          </p>

          <form onSubmit={handleSubmit} className="login-form">
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

            <button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>

          </form>

          <span className="login-link">
            Não tem conta?
            <Link to="/CadastroLogin"> Criar conta</Link>
          </span>
        </div>

        {/* direita */}
        <div className="login-image">
          <img src="/logo.png" alt="Consuman Logo" />
        </div>

      </div>
    </div>
  );
}

export default Login;