import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { excluirEvento, listarEventos } from "../services/eventoService";
import type { Evento } from "../types/evento";
import { EventoModal } from "../components/EventoModal";

import { EventoEditModal } from "../components/EventoEditModal";
import { removerToken } from "../storage/authStorage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../routes/types";
import axios from "axios";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export function HomeScreen() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<Evento | null>(null);
  const navigation = useNavigation<HomeNavigationProp>();

  function tratarErroAutenticacao(error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      navigation.replace("Login");
      return true;
    }

    return false;
  }

  async function handleLogout() {
    await removerToken();
    navigation.replace("Login");
  }

  async function recarregarEventos() {
    try {
      const resposta = await listarEventos();
      setEventos(resposta);
    } catch (error) {
      if (tratarErroAutenticacao(error)) {
        return;
      }

      Alert.alert("Erro", "Não foi possível carregar os eventos.");
    }
  }

  useEffect(() => {
    listarEventos()
      .then(setEventos)
      .catch((error) => {
        if (tratarErroAutenticacao(error)) {
          return;
        }

        Alert.alert("Erro", "Não foi possível carregar os eventos.");
      });
  }, []);

  function handleExcluir(eventoId: number) {
    Alert.alert(
      "Excluir evento",
      "Tem certeza que deseja excluir este evento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await excluirEvento(eventoId);
              await recarregarEventos();

              Alert.alert("Sucesso", "Evento excluído com sucesso.");
            } catch (error) {
              if (tratarErroAutenticacao(error)) {
                return;
              }

              Alert.alert("Erro", "Não foi possível excluir o evento.");
            }
          },
        },
      ],
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>GERENCIADOR DE EVENTOS</Text>
          <Text style={styles.titulo}>Meus Eventos</Text>
          <Text style={styles.subtitulo}>
            Organize e acompanhe seus eventos.
          </Text>
        </View>

        <Pressable style={styles.botaoSair} onPress={handleLogout}>
          <Text style={styles.textoBotaoSair}>Sair</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.botaoAdicionar}
        onPress={() => setModalAberta(true)}
      >
        <Text style={styles.textoBotaoAdicionar}>+ Adicionar Evento</Text>
      </Pressable>

      <EventoModal
        visivel={modalAberta}
        onFechar={() => setModalAberta(false)}
        onEventoCadastrado={recarregarEventos}
      />
      {eventoEmEdicao && (
        <EventoEditModal
          evento={eventoEmEdicao}
          visivel={true}
          onFechar={() => setEventoEmEdicao(null)}
          onEventoAtualizado={() => {
            recarregarEventos();
            setEventoEmEdicao(null);
          }}
        />
      )}

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioTitulo}>Nenhum evento cadastrado</Text>
            <Text style={styles.vazioTexto}>
              Adicione seu primeiro evento para começar.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const dataFormatada = new Date(
            `${item.data}T00:00:00`,
          ).toLocaleDateString("pt-BR");

          return (
            <View style={styles.card}>
              {item.imagem && (
                <Image source={{ uri: item.imagem }} style={styles.imagem} />
              )}

              <Text style={styles.cardTitulo}>{item.nome}</Text>
              <Text style={styles.cardInfo}>📅 {dataFormatada}</Text>
              <Text style={styles.cardInfo}>📍 {item.localizacao}</Text>

              <View style={styles.acoes}>
                <Pressable
                  style={styles.botaoEditar}
                  onPress={() => setEventoEmEdicao(item)}
                >
                  <Text style={styles.textoEditar}>Editar</Text>
                </Pressable>

                <Pressable
                  style={styles.botaoExcluir}
                  onPress={() => handleExcluir(item.id)}
                >
                  <Text style={styles.textoExcluir}>Excluir</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f6f8",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: 1,
    marginBottom: 6,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  botaoSair: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
  },

  textoBotaoSair: {
    fontWeight: "600",
    color: "#374151",
  },

  botaoAdicionar: {
    backgroundColor: "#2563eb",
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 20,
  },

  textoBotaoAdicionar: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },

  lista: {
    gap: 16,
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  imagem: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 14,
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  cardInfo: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 6,
  },

  acoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  botaoEditar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 9,
  },

  textoEditar: {
    fontWeight: "600",
    color: "#374151",
  },

  botaoExcluir: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#dc2626",
    borderRadius: 9,
  },

  textoExcluir: {
    color: "#ffffff",
    fontWeight: "700",
  },

  vazio: {
    padding: 28,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    alignItems: "center",
  },

  vazioTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  vazioTexto: {
    color: "#6b7280",
    marginTop: 6,
    textAlign: "center",
  },
});
