package br.com.neki.gerenciador_eventos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.neki.gerenciador_eventos.dto.auth.LoginRequestDTO;
import br.com.neki.gerenciador_eventos.dto.auth.LoginResponseDTO;
import br.com.neki.gerenciador_eventos.entity.Administrador;
import br.com.neki.gerenciador_eventos.service.AdministradorService;
import br.com.neki.gerenciador_eventos.service.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Operações de autenticação de administradores")
public class AuthController {

    private final AdministradorService administradorService;
    private final JwtService jwtService;

    public AuthController(AdministradorService administradorService, JwtService jwtService) {
        this.administradorService = administradorService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    @Operation(summary = "Realizar login", description = "Autentica o administrador e retorna um token JWt")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos"),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {

        Administrador administrador = administradorService.autenticar(dto);

        String token = jwtService.gerarToken(administrador);

        return ResponseEntity.ok(
                new LoginResponseDTO(token));
    }

}
