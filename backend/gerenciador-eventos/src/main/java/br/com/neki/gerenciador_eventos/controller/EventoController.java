package br.com.neki.gerenciador_eventos.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.neki.gerenciador_eventos.dto.evento.EventoRequestDTO;
import br.com.neki.gerenciador_eventos.dto.evento.EventoResponseDTO;
import br.com.neki.gerenciador_eventos.dto.evento.EventoUpdateDTO;
import br.com.neki.gerenciador_eventos.service.EventoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/eventos")
public class EventoController {
    private final EventoService eventoService;

    public EventoController(EventoService eventoService){
        this.eventoService = eventoService;
    }

    @GetMapping("/administrador/{adminId}")
    public ResponseEntity<List<EventoResponseDTO>> listarPorAdministrador(@PathVariable Long adminId){
        return ResponseEntity.ok(eventoService.listarPorAdministrador(adminId));
    }

    @PostMapping
    public ResponseEntity<EventoResponseDTO> cadastrar(@Valid @RequestBody EventoRequestDTO dto){
        EventoResponseDTO resposta = eventoService.cadastrar(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
    }

   @PatchMapping("/{eventoId}")
    public ResponseEntity<EventoResponseDTO> atualizar(
        @PathVariable Long eventoId,
        @RequestBody EventoUpdateDTO dto) {

    EventoResponseDTO resposta = eventoService.atualizar(eventoId, dto);

    return ResponseEntity.ok(resposta);
}

    @DeleteMapping("/{eventoId}")
    public ResponseEntity<Void> excluir(@PathVariable Long eventoId){
        eventoService.excluir(eventoId);
        return ResponseEntity.noContent().build();
    }
}
