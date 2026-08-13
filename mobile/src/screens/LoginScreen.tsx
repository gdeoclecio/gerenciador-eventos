import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { login } from "../services/authService";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes/types";
import {
  obterCredenciais,
  removerCredenciais,
  salvarCredenciais,
  salvarToken,
} from "../storage/authStorage";

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [gravarSenha, setGravarSenha] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigation = useNavigation<LoginNavigationProp>();

  async function handleLogin() {
    try {
      const resposta = await login({
        email,
        senha,
      });

      await salvarToken(resposta.token);
      if (gravarSenha) {
        await salvarCredenciais(email, senha);
      } else {
        await removerCredenciais();
      }

      navigation.replace("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível realizar o login");
    }
  }
  useEffect(() => {
    async function carregarCredenciais() {
      const credenciais = await obterCredenciais();

      if (credenciais.email && credenciais.senha) {
        setEmail(credenciais.email);
        setSenha(credenciais.senha);
        setGravarSenha(true);
      }
    }

    carregarCredenciais();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Entrar</Text>

        <Text style={styles.subtitulo}>
          Acesse sua conta para gerenciar seus eventos.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View style={styles.senhaContainer}>
          <TextInput
            style={styles.senhaInput}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />

          <Pressable
            style={styles.botaoOlho}
            onPress={() => setMostrarSenha((valorAtual) => !valorAtual)}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6b7280"
            />
          </Pressable>
        </View>
        <Pressable
          style={styles.gravarSenhaContainer}
          onPress={() => setGravarSenha((valorAtual) => !valorAtual)}
        >
          <View
            style={[styles.checkbox, gravarSenha && styles.checkboxMarcado]}
          >
            {gravarSenha && <Text style={styles.check}>✓</Text>}
          </View>

          <Text style={styles.gravarSenhaTexto}>Gravar senha</Text>
        </Pressable>

        <Pressable style={styles.botaoPrincipal} onPress={handleLogin}>
          <Text style={styles.textoBotaoPrincipal}>Entrar</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.link}>Cadastrar-se</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f6f8",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 28,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  titulo: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: "#ffffff",
  },

  botaoPrincipal: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 4,
  },

  textoBotaoPrincipal: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  link: {
    textAlign: "center",
    color: "#2563eb",
    fontSize: 16,
    marginTop: 18,
  },
  gravarSenhaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  checkboxMarcado: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  check: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  gravarSenhaTexto: {
    color: "#374151",
    fontSize: 15,
  },
  senhaContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginBottom: 14,
  },

  senhaInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },

  botaoOlho: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

});
