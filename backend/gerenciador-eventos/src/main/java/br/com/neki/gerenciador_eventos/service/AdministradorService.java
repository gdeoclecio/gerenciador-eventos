package br.com.neki.gerenciador_eventos.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.neki.gerenciador_eventos.dto.administrador.AdministradorRequestDTO;
import br.com.neki.gerenciador_eventos.dto.administrador.AdministradorResponseDTO;
import br.com.neki.gerenciador_eventos.entity.Administrador;
import br.com.neki.gerenciador_eventos.repository.AdministradorRepository;

@Service
public class AdministradorService {
    
    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;

    public AdministradorService(AdministradorRepository administradorRepository, PasswordEncoder passwordEncoder){
        this.administradorRepository = administradorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    
    public AdministradorResponseDTO cadastrar(AdministradorRequestDTO dto){
        if(administradorRepository.existsByEmail(dto.email())){
            throw new RuntimeException("Email já cadastrado");
        }
        String senhaCriptografada = passwordEncoder.encode(dto.senha());

        Administrador administrador = new Administrador(
            dto.nome(),
            dto.email(),
            senhaCriptografada
        );

        Administrador salvo = administradorRepository.save(administrador);

        return new AdministradorResponseDTO(
            salvo.getId(),
            salvo.getNome(),
            salvo.getEmail()
        );
    }
}
