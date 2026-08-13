import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Image, Text, View } from "react-native";

import { excluirEvento, listarEventos } from "../services/eventoService";
import type { Evento } from "../types/evento";
import { EventoForm } from "../components/EventoForm";
import { EventoModal } from "../components/EventoModal";
import { EventoEditForm } from "../components/EventoEditForm";

export function HomeScreen() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<number | null>(null);

  async function recarregarEventos() {
    const resposta = await listarEventos();
    setEventos(resposta);
  }

  useEffect(() => {
    listarEventos().then(setEventos);
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
            } catch {
              Alert.alert("Erro", "Não foi possível excluir o evento.");
            }
          },
        },
      ],
    );
  }
  return (
    <View>
      <Text>Meus Eventos</Text>

      <Button title="Adicionar Evento" onPress={() => setModalAberta(true)} />

      <EventoModal
        visivel={modalAberta}
        onFechar={() => setModalAberta(false)}
        onEventoCadastrado={recarregarEventos}
      />

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Nenhum evento cadastrado.</Text>}
        renderItem={({ item }) => (
          <View>
            {item.imagem && (
              <Image
                source={{ uri: item.imagem }}
                style={{ width: 200, height: 120 }}
              />
            )}

            <Text>{item.nome}</Text>
            <Text>{item.data}</Text>
            <Text>{item.localizacao}</Text>

            <Button title="Editar" onPress={() => setEventoEmEdicao(item.id)} />

            <Button title="Excluir" onPress={() => handleExcluir(item.id)} />

            {eventoEmEdicao === item.id && (
              <EventoEditForm
                evento={item}
                onEventoAtualizado={() => {
                  recarregarEventos();
                  setEventoEmEdicao(null);
                }}
                onCancelar={() => setEventoEmEdicao(null)}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}
