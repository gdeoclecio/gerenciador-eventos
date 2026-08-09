package br.com.neki.gerenciador_eventos.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import br.com.neki.gerenciador_eventos.dto.administrador.AdministradorRequestDTO;
import br.com.neki.gerenciador_eventos.dto.administrador.AdministradorResponseDTO;
import br.com.neki.gerenciador_eventos.dto.auth.LoginRequestDTO;
import br.com.neki.gerenciador_eventos.entity.Administrador;
import br.com.neki.gerenciador_eventos.exception.CredenciaisInvalidasException;
import br.com.neki.gerenciador_eventos.exception.EmailJaCadastradoException;
import br.com.neki.gerenciador_eventos.repository.AdministradorRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class AdministradorServiceTest {

    @Mock
    private AdministradorRepository administradorRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AdministradorService administradorService;

    @Test
    void deveCadastrarAdministradorComSucesso() {
        AdministradorRequestDTO dto = new AdministradorRequestDTO(
                "Gabriela",
                "gabriela@email.com",
                "123456");

        Administrador administradorSalvo = new Administrador(
                "Gabriela",
                "gabriela@email.com",
                "senhaCriptografada");

        when(administradorRepository.existsByEmail(dto.email()))
                .thenReturn(false);

        when(passwordEncoder.encode(dto.senha()))
                .thenReturn("senhaCriptografada");

        when(administradorRepository.save(any(Administrador.class)))
                .thenReturn(administradorSalvo);

        AdministradorResponseDTO resposta = administradorService.cadastrar(dto);
        assertNotNull(resposta);
        assertEquals("Gabriela", resposta.nome());
        assertEquals("gabriela@email.com", resposta.email());

        verify(administradorRepository).existsByEmail(dto.email());
        verify(passwordEncoder).encode(dto.senha());
        verify(administradorRepository).save(any(Administrador.class));

    }

    @Test
    void naoDeveCadastrarAdministradorComEmailDuplicado() {

        AdministradorRequestDTO dto = new AdministradorRequestDTO(
                "Gabriela",
                "gabriela@email.com",
                "123456");

        when(administradorRepository.existsByEmail(dto.email()))
                .thenReturn(true);

        assertThrows(
                EmailJaCadastradoException.class,
                () -> administradorService.cadastrar(dto));

        verify(administradorRepository).existsByEmail(dto.email());
        verify(passwordEncoder, never()).encode(anyString());
        verify(administradorRepository, never()).save(any(Administrador.class));
    }

    @Test
    void deveAutenticarAdministradorComSucesso() {

        LoginRequestDTO dto = new LoginRequestDTO(
                "gabriela@email.com",
                "123456");

        Administrador administrador = new Administrador(
                "Gabriela",
                "gabriela@email.com",
                "senhaCriptografada");

        when(administradorRepository.findByEmail(dto.email()))
                .thenReturn(Optional.of(administrador));

        when(passwordEncoder.matches(dto.senha(), administrador.getSenha()))
                .thenReturn(true);

        Administrador resultado = administradorService.autenticar(dto);

        assertNotNull(resultado);
        assertEquals("gabriela@email.com", resultado.getEmail());

        verify(administradorRepository).findByEmail(dto.email());
        verify(passwordEncoder).matches(dto.senha(), administrador.getSenha());
    }

    @Test
    void naoDeveAutenticarComSenhaIncorreta() {

        LoginRequestDTO dto = new LoginRequestDTO(
                "gabriela@email.com",
                "senhaErrada");

        Administrador administrador = new Administrador(
                "Gabriela",
                "gabriela@email.com",
                "senhaCriptografada");

        when(administradorRepository.findByEmail(dto.email()))
                .thenReturn(Optional.of(administrador));

        when(passwordEncoder.matches(dto.senha(), administrador.getSenha()))
                .thenReturn(false);

        assertThrows(
                CredenciaisInvalidasException.class,
                () -> administradorService.autenticar(dto));

        verify(administradorRepository).findByEmail(dto.email());
        verify(passwordEncoder).matches(dto.senha(), administrador.getSenha());
    }

    @Test
    void naoDeveAutenticarComEmailInexistente() {

        LoginRequestDTO dto = new LoginRequestDTO(
                "naoexiste@email.com",
                "123456");

        when(administradorRepository.findByEmail(dto.email()))
                .thenReturn(Optional.empty());

        assertThrows(
                CredenciaisInvalidasException.class,
                () -> administradorService.autenticar(dto));

        verify(administradorRepository).findByEmail(dto.email());

        verify(passwordEncoder, never())
                .matches(anyString(), anyString());
    }
}
