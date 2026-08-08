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
import jakarta.validation.Valid;

@RestController
@RequestMapping("/administradores")
public class AdministradorController {
    
    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService){
        this.administradorService = administradorService;
    }

    @PostMapping
    public ResponseEntity<AdministradorResponseDTO> cadastrar(@Valid @RequestBody AdministradorRequestDTO dto){
        AdministradorResponseDTO resposta = administradorService.cadastrar(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
    }
}
