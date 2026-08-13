import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { cadastrarAdministrador } from "../services/administradorService";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes/types";

type CadastroNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Cadastro"
>;

export function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
 const navigation = useNavigation<CadastroNavigationProp>();

  async function handleCadastro() {
    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      await cadastrarAdministrador({
        nome,
        email,
        senha,
      });

      Alert.alert("Sucesso", "Administrador cadastrado com sucesso.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch {
      Alert.alert("Erro", "Email já cadastrado ou dados inválidos.");
    }
  }

 return (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.titulo}>Criar conta</Text>

      <Text style={styles.subtitulo}>
        Cadastre-se para começar a gerenciar seus eventos.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <Pressable style={styles.botaoPrincipal} onPress={handleCadastro}>
        <Text style={styles.textoBotaoPrincipal}>Cadastrar</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Cancelar</Text>
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
});