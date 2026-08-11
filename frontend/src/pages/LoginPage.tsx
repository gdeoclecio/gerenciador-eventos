import { useState } from "react";
import { login, salvarToken } from "../services/authService";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const mensagemSucesso = location.state?.mensagem;

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const resposta = await login({
            email,
            senha,
        });

        salvarToken(resposta.token)
        navigate("/eventos")
    }

    return(
        <form onSubmit={handleSubmit}>
            {mensagemSucesso && <p>{mensagemSucesso}</p>}
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