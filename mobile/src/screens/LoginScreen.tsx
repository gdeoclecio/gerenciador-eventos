import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

import { login } from "../services/authService";
import { salvarToken } from "../storage/authStorage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
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
    <View>
      <Text>Login</Text>

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

      <Button title="Entrar" onPress={handleLogin} />
      <Button
        title="Cadastrar-se"
        onPress={() => navigation.navigate("Cadastro" as never)}
      />
    </View>
  );
}
