import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { cadastrarEvento } from "../services/eventoService";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes/types";

type EventoFormNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
interface EventoFormProps {
  onEventoCadastrado: () => void;
}

export function EventoForm({ onEventoCadastrado }: EventoFormProps) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [imagem, setImagem] = useState("");
  const navigation = useNavigation<EventoFormNavigationProp>();

  async function handleCadastrar() {
    if (!nome.trim() || !data.trim() || !localizacao.trim() || !imagem.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await cadastrarEvento({
        nome,
        data: converterDataParaApi(data),
        localizacao,
        imagem,
      });

      setNome("");
      setData("");
      setLocalizacao("");
      setImagem("");

      onEventoCadastrado();

      Alert.alert("Sucesso", "Evento cadastrado com sucesso.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigation.replace("Login");
        return;
      }

      Alert.alert("Erro", "Não foi possível cadastrar o evento.");
    }
  }
  function formatarData(valor: string) {
    const numeros = valor.replace(/\D/g, "").slice(0, 8);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 4) {
      return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    }

    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
  }
  function converterDataParaApi(data: string) {
  const [dia, mes, ano] = data.split("/");

  return `${ano}-${mes}-${dia}`;
}

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nome do evento"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Data (DD/MM/AAAA)"
        value={data}
        onChangeText={(valor) => setData(formatarData(valor))}
        keyboardType="numeric"
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <TextInput
        style={styles.input}
        placeholder="URL da imagem"
        value={imagem}
        onChangeText={setImagem}
        autoCapitalize="none"
      />

      <Pressable style={styles.botaoPrincipal} onPress={handleCadastrar}>
        <Text style={styles.textoBotaoPrincipal}>Adicionar Evento</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    gap: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
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
});
