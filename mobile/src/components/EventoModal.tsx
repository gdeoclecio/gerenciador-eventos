import {
  Button,
  Modal,
  Pressable,
  View,
} from "react-native";

import { EventoForm } from "./EventoForm";

interface EventoModalProps {
  visivel: boolean;
  onFechar: () => void;
  onEventoCadastrado: () => void;
}

export function EventoModal({
  visivel,
  onFechar,
  onEventoCadastrado,
}: EventoModalProps) {
  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={onFechar}
    >
      <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={onFechar}
      >
        <Pressable
          onPress={(event) => event.stopPropagation()}
          style={{
            margin: 24,
            marginTop: "auto",
            marginBottom: "auto",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <EventoForm
            onEventoCadastrado={() => {
              onEventoCadastrado();
              onFechar();
            }}
          />

          <Button
            title="Fechar"
            onPress={onFechar}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}