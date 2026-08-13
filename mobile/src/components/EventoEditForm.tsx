import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
  const [data, setData] = useState(() => {
    const [ano, mes, dia] = evento.data.split("-");
    return `${dia}/${mes}/${ano}`;
  });
  const [localizacao, setLocalizacao] = useState(evento.localizacao);
  const navigation = useNavigation<EventoEditFormNavigationProp>();

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

  async function handleAtualizar() {
    if (!data.trim() && !localizacao.trim()) {
      Alert.alert("Erro", "Informe a data ou a localização para atualização.");
      return;
    }

    try {
      await atualizarEvento(evento.id, {
        data: converterDataParaApi(data),
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
    <View style={styles.form}>
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

      <Pressable style={styles.botaoPrincipal} onPress={handleAtualizar}>
        <Text style={styles.textoBotaoPrincipal}>Salvar alterações</Text>
      </Pressable>

      <Pressable style={styles.botaoSecundario} onPress={onCancelar}>
        <Text style={styles.textoBotaoSecundario}>Cancelar</Text>
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

  botaoSecundario: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
  },

  textoBotaoSecundario: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },
});
