import { useState } from "react";
import { cadastrarAdministrador } from "../services/administradorService";
import { useNavigate } from "react-router-dom";

export function CadastroPage() {
    const [nome, setNome] = useState("");
    const [email, setemail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();

        if(senha !== confirmarSenha) {
            setMensagem("As senhas não coincidem");
            return;
        }
        await cadastrarAdministrador({
            nome,
            email,
            senha,
        });
        navigate("/login", {
            state:{mensagem: "Administrador cadastrado com sucesso"}
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
            placeholder="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)} />

            <input type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setemail(event.currentTarget.value)} />

            <input type="password" 
            placeholder="Senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}/>

            <input type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}/>

            <button type="submit">Cadastrar</button>
            {mensagem && <p>{mensagem}</p>}
           
        </form>
    )
}