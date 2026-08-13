import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

import { cadastrarEvento } from "../services/eventoService";
import axios from "axios";

interface EventoFormProps {
  onEventoCadastrado: () => void;
}

export function EventoForm({ onEventoCadastrado }: EventoFormProps) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [imagem, setImagem] = useState("");

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
    } catch {
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
