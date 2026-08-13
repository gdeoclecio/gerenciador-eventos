import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

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
        data,
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

  return (
    <View>
      <TextInput
        placeholder="Nome do evento"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Data (AAAA-MM-DD)"
        value={data}
        onChangeText={setData}
      />

      <TextInput
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <TextInput
        placeholder="URL da imagem"
        value={imagem}
        onChangeText={setImagem}
        autoCapitalize="none"
      />

      <Button title="Adicionar Evento" onPress={handleCadastrar} />
    </View>
  );
}
