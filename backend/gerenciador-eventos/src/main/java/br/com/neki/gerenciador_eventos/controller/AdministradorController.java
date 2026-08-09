package br.com.neki.gerenciador_eventos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.neki.gerenciador_eventos.dto.administrador.AdministradorRequestDTO;
import br.com.neki.gerenciador_eventos.dto.administrador.AdministradorResponseDTO;
import br.com.neki.gerenciador_eventos.service.AdministradorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/administradores")
@Tag(name = "Administradores", description = "Operações relacionadas ao cadastro de administradores")
public class AdministradorController {

    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    @PostMapping
    @Operation(summary = "Cadastrar administrador", description = "Cadastra um novo administrador no sistema")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Administrador cadastrado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos"),
            @ApiResponse(responseCode = "409", description = "Email já cadastrado")
    })
    public ResponseEntity<AdministradorResponseDTO> cadastrar(@Valid @RequestBody AdministradorRequestDTO dto) {
        AdministradorResponseDTO resposta = administradorService.cadastrar(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
    }
}
