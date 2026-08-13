import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
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
    <View>
      <Text>Criar conta</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
}
