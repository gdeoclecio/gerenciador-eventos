import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

import { atualizarEvento } from "../services/eventoService";
import type { Evento } from "../types/evento";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes/types";

type EventoEditFormNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
interface EventoEditFormProps {
  evento: Evento;
  onEventoAtualizado: () => void;
  onCancelar: () => void;
}

export function EventoEditForm({
  evento,
  onEventoAtualizado,
  onCancelar,
}: EventoEditFormProps) {
  const [data, setData] = useState(evento.data);
  const [localizacao, setLocalizacao] = useState(evento.localizacao);
  const navigation = useNavigation<EventoEditFormNavigationProp>();

  async function handleAtualizar() {
    if (!data.trim() && !localizacao.trim()) {
      Alert.alert("Erro", "Informe a data ou a localização para atualização.");
      return;
    }

    try {
      await atualizarEvento(evento.id, {
        data,
        localizacao,
      });

      onEventoAtualizado();

      Alert.alert("Sucesso", "Evento atualizado com sucesso.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigation.replace("Login");
        return;
      }

      Alert.alert("Erro", "Não foi possível atualizar o evento.");
    }
  }

  return (
    <View>
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

      <Button title="Salvar alterações" onPress={handleAtualizar} />

      <Button title="Cancelar" onPress={onCancelar} />
    </View>
  );
}
