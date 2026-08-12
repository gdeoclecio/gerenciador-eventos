import { useState } from "react";
import { login, salvarToken } from "../services/authService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";

export function LoginPage() {
  const [email, setEmail] = useState(
    () => localStorage.getItem("emailSalvo") ?? "",
  );

  const [senha, setSenha] = useState(
    () => localStorage.getItem("senhaSalva") ?? "",
  );

  const [gravarSenha, setGravarSenha] = useState(
    () =>
      !!localStorage.getItem("emailSalvo") &&
      !!localStorage.getItem("senhaSalva"),
  );
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const mensagemSucesso = location.state?.mensagem;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim() || !senha) {
      setErro("Preencha email e senha.");
      return;
    }

    try {
      setErro("");

      const resposta = await login({
        email,
        senha,
      });

      salvarToken(resposta.token);
      if (gravarSenha) {
        localStorage.setItem("emailSalvo", email);
        localStorage.setItem("senhaSalva", senha);
      } else {
        localStorage.removeItem("emailSalvo");
        localStorage.removeItem("senhaSalva");
      }
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
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={gravarSenha}
              onChange={(event) => setGravarSenha(event.target.checked)}
            />
            Gravar senha
          </label>

          <button className="btn btn-primary" type="submit">
            Entrar
          </button>

          <Link to="/cadastro">Cadastrar-se</Link>
        </form>
      </section>
    </main>
  );
}
