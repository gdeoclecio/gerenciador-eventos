import { useState } from "react";
import { login, salvarToken } from "../services/authService";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const resposta = await login({
            email,
            senha,
        });

        salvarToken(resposta.token)
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)} />

            <input type="password"
            placeholder="Senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)} />

            <button type="submit">Entrar</button>
        </form>
    );
}