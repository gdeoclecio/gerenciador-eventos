import { useState } from "react";
import { login, salvarToken } from "../services/authService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const mensagemSucesso = location.state?.mensagem;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setErro("");

      const resposta = await login({
        email,
        senha,
      });

      salvarToken(resposta.token);
      navigate("/eventos");
    } catch {
      setErro("Email ou senha inválidos");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Entrar</h1>
        <p>Acesse sua conta para gerenciar seus eventos.</p>

        {mensagemSucesso && (
          <p className="mensagem-sucesso">{mensagemSucesso}</p>
        )}

        {erro && <p className="mensagem-erro">{erro}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />

          <button className="btn btn-primary" type="submit">
            Entrar
          </button>

          <Link to="/cadastro">Cadastrar-se</Link>
        </form>
      </section>
    </main>
  );
}
