package br.com.neki.gerenciador_eventos.controller;

import java.util.List;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/eventos")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Eventos", description = "Operações de cadastro, listagem, atualização e exclusão de eventos")
public class EventoController {
    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping
    @Operation(summary = "Listar eventos", description = "Lista os eventos pertencentes ao administrador autenticado")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Eventos listados"),
            @ApiResponse(responseCode = "401", description = "Não autenticado")
    })
    public ResponseEntity<List<EventoResponseDTO>> listarPorAdministrador(
            @AuthenticationPrincipal Jwt jwt) {

        Number adminIdClaim = jwt.getClaim("adminId");
        Long adminId = adminIdClaim.longValue();

        return ResponseEntity.ok(
                eventoService.listarPorAdministrador(adminId));
    }

    @PostMapping
    @Operation(summary = "Cadastrar evento", description = "cadastra um novo evento para o administrador autenticado")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Evento cadastrado"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos"),
            @ApiResponse(responseCode = "401", description = "Não autenticado")
    })
    public ResponseEntity<EventoResponseDTO> cadastrar(@Valid @RequestBody EventoRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt) {
        Number adminIdClaim = jwt.getClaim("adminId");
        Long adminId = adminIdClaim.longValue();

        EventoResponseDTO resposta = eventoService.cadastrar(dto, adminId);

        return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
    }

    @PatchMapping("/{eventoId}")
    @Operation(summary = "Atualizar evento", description = "Atualiza a data e/ou localização de um evento pertencente ao administrador autenticado")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Evento atualizado"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos"),
            @ApiResponse(responseCode = "401", description = "Não autenticado"),
            @ApiResponse(responseCode = "403", description = "Evento pertence a outro administrador"),
            @ApiResponse(responseCode = "404", description = "Evento não encontrado")

    })
    public ResponseEntity<EventoResponseDTO> atualizar(
            @PathVariable Long eventoId,
            @Valid @RequestBody EventoUpdateDTO dto, @AuthenticationPrincipal Jwt jwt) {

        Number adminIdClaim = jwt.getClaim("adminId");
        Long adminId = adminIdClaim.longValue();

        EventoResponseDTO resposta = eventoService.atualizar(eventoId, dto, adminId);

        return ResponseEntity.ok(resposta);
    }

    @DeleteMapping("/{eventoId}")
    @Operation(summary = "Excluir evento", description = "Exclui um evento pertencente ao administrador autenticado")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Evento excluido"),
            @ApiResponse(responseCode = "401", description = "Não autenticado"),
            @ApiResponse(responseCode = "403", description = "Evento pertence a outro administrador"),
            @ApiResponse(responseCode = "404", description = "Evento não encontrado")
    })
    public ResponseEntity<Void> excluir(@PathVariable Long eventoId, @AuthenticationPrincipal Jwt jwt) {

        Number adminIdClaim = jwt.getClaim("adminId");
        Long adminId = adminIdClaim.longValue();

        eventoService.excluir(eventoId, adminId);
        return ResponseEntity.noContent().build();
    }
}
