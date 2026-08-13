import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import type { Evento } from "../types/evento";
import { EventoEditForm } from "./EventoEditForm";

interface EventoEditModalProps {
  evento: Evento;
  visivel: boolean;
  onFechar: () => void;
  onEventoAtualizado: () => void;
}

export function EventoEditModal({
  evento,
  visivel,
  onFechar,
  onEventoAtualizado,
}: EventoEditModalProps) {
  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={onFechar}
    >
      <Pressable style={styles.overlay} onPress={onFechar}>
        <Pressable
          style={styles.modal}
          onPress={(event) => event.stopPropagation()}
        >
          <Text style={styles.titulo}>Editar Evento</Text>

          <Text style={styles.subtitulo}>
            Atualize a data ou a localização do evento.
          </Text>

          <EventoEditForm
            evento={evento}
            onEventoAtualizado={() => {
              onEventoAtualizado();
              onFechar();
            }}
            onCancelar={onFechar}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(17, 24, 39, 0.55)",
  },

  modal: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 18,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 20,
  },
});