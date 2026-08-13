import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { login } from "../services/authService";
import { salvarToken } from "../storage/authStorage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes/types";

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;


export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation<LoginNavigationProp>();
  
  async function handleLogin() {
    try {
      const resposta = await login({
        email,
        senha,
      });

      await salvarToken(resposta.token);

     navigation.replace("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível realizar o login");
    }
  }

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

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

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
});
