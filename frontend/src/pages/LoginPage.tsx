import { useState } from "react";
import { login, salvarToken } from "../services/authService";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

    return(
        <form onSubmit={handleSubmit}>
            {mensagemSucesso && <p>{mensagemSucesso}</p>}
            {erro && <p>{erro}</p>}
            <input type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)} />

            <input type="password"
            placeholder="Senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)} />

            <button type="submit">Entrar</button>
            <Link to="/cadastro">Cadastrar-se</Link>
        </form>
    );
}