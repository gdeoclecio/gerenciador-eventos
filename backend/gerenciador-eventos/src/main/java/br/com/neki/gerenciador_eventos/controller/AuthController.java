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

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AdministradorService administradorService;
    private final JwtService jwtService;

    public AuthController(AdministradorService administradorService, JwtService jwtService) {
        this.administradorService = administradorService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto) {

        Administrador administrador = administradorService.autenticar(dto);
        
        String token = jwtService.gerarToken(administrador);

        return ResponseEntity.ok(
            new LoginResponseDTO(token)
        );
    }
    
}
