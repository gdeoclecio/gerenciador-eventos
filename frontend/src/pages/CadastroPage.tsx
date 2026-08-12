import { useState } from "react";
import { cadastrarAdministrador } from "../services/administradorService";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export function CadastroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem");
      return;
    }
    try {
      setErro("");
      await cadastrarAdministrador({
        nome,
        email,
        senha,
      });
      navigate("/login", {
        state: { mensagem: "Administrador cadastrado com sucesso" },
      });
    } catch {
      setErro("Email já cadastrado ou dados inválidos");
    }
  }
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Criar conta</h1>
        <p>Cadastre-se para começar a gerenciar seus eventos.</p>

        {mensagem && <p className="mensagem-erro">{mensagem}</p>}

        {erro && <p className="mensagem-erro">{erro}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />

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

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
          />

          <button className="btn btn-primary" type="submit">
            Cadastrar
          </button>
        </form>
      </section>
    </main>
  );
}
