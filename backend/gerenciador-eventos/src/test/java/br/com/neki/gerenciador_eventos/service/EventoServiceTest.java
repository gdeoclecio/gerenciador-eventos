package br.com.neki.gerenciador_eventos.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import br.com.neki.gerenciador_eventos.dto.evento.EventoRequestDTO;
import br.com.neki.gerenciador_eventos.dto.evento.EventoResponseDTO;
import br.com.neki.gerenciador_eventos.dto.evento.EventoUpdateDTO;
import br.com.neki.gerenciador_eventos.entity.Administrador;
import br.com.neki.gerenciador_eventos.entity.Evento;
import br.com.neki.gerenciador_eventos.exception.AcessoNegadoException;
import br.com.neki.gerenciador_eventos.exception.AdministradorNaoEncontradoException;
import br.com.neki.gerenciador_eventos.exception.EventoNaoEncontradoException;
import br.com.neki.gerenciador_eventos.repository.AdministradorRepository;
import br.com.neki.gerenciador_eventos.repository.EventoRepository;

@ExtendWith(MockitoExtension.class)
public class EventoServiceTest {

    @Mock
    private EventoRepository eventoRepository;

    @Mock
    private AdministradorRepository administradorRepository;

    @InjectMocks
    private EventoService eventoService;

    @Test
    void deveCadastrarEventoComSucesso() {
        EventoRequestDTO dto = new EventoRequestDTO(
                "Evento Teste",
                LocalDate.of(2026, 9, 20),
                "Petrópolis",
                "evento.jpg");

        Long adminId = 1L;

        Administrador administrador = new Administrador(
                "Gabriela",
                "gabriela@email.com",
                "senhaCriptografada");

        Evento eventoSalvo = new Evento(
                dto.nome(),
                dto.data(),
                dto.localizacao(),
                dto.imagem(),
                administrador);

        when(administradorRepository.findById(adminId))
                .thenReturn(Optional.of(administrador));

        when(eventoRepository.save(any(Evento.class)))
                .thenReturn(eventoSalvo);

        EventoResponseDTO resposta = eventoService.cadastrar(dto, adminId);
        assertNotNull(resposta);

        assertEquals("Evento Teste", resposta.nome());
        assertEquals(LocalDate.of(2026, 9, 20), resposta.data());
        assertEquals("Petrópolis", resposta.localizacao());

        verify(administradorRepository).findById(adminId);
        verify(eventoRepository).save(any(Evento.class));

    }

    @Test
    void naoDeveCadastrarEventoComAdministradorInexistente() {

        EventoRequestDTO dto = new EventoRequestDTO(
                "Evento Teste",
                LocalDate.of(2026, 9, 20),
                "Petrópolis",
                "evento.jpg");

        Long adminId = 999L;

        when(administradorRepository.findById(adminId))
                .thenReturn(Optional.empty());

        assertThrows(
                AdministradorNaoEncontradoException.class,
                () -> eventoService.cadastrar(dto, adminId));

        verify(administradorRepository).findById(adminId);

        verify(eventoRepository, never())
                .save(any(Evento.class));
    }

    @Test
    void deveAtualizarEventoComSucesso() {

        Long eventoId = 1L;
        Long adminId = 1L;

        Administrador administrador = mock(Administrador.class);
        when(administrador.getId()).thenReturn(adminId);

        Evento evento = new Evento(
                "Evento Teste",
                LocalDate.of(2026, 9, 20),
                "Petrópolis",
                "evento.jpg",
                administrador);

        EventoUpdateDTO dto = new EventoUpdateDTO(
                LocalDate.of(2026, 10, 10),
                "Rio de Janeiro");

        when(eventoRepository.findById(eventoId))
                .thenReturn(Optional.of(evento));

        when(eventoRepository.save(any(Evento.class)))
                .thenReturn(evento);

        EventoResponseDTO resposta = eventoService.atualizar(eventoId, dto, adminId);

        assertNotNull(resposta);
        assertEquals(LocalDate.of(2026, 10, 10), resposta.data());
        assertEquals("Rio de Janeiro", resposta.localizacao());

        verify(eventoRepository).findById(eventoId);
        verify(eventoRepository).save(any(Evento.class));
    }

    @Test
    void naoDeveAtualizarEventoDeOutroAdministrador() {

        Long eventoId = 1L;
        Long adminIdAutenticado = 2L;
        Long adminIdDonoDoEvento = 1L;

        Administrador administradorDono = mock(Administrador.class);
        when(administradorDono.getId()).thenReturn(adminIdDonoDoEvento);

        Evento evento = new Evento(
                "Evento Teste",
                LocalDate.of(2026, 9, 20),
                "Petrópolis",
                "evento.jpg",
                administradorDono);

        EventoUpdateDTO dto = new EventoUpdateDTO(
                LocalDate.of(2026, 10, 10),
                "Rio de Janeiro");

        when(eventoRepository.findById(eventoId))
                .thenReturn(Optional.of(evento));

        assertThrows(
                AcessoNegadoException.class,
                () -> eventoService.atualizar(eventoId, dto, adminIdAutenticado));

        verify(eventoRepository).findById(eventoId);

        verify(eventoRepository, never())
                .save(any(Evento.class));
    }

    @Test
    void deveExcluirEventoComSucesso() {

        Long eventoId = 1L;
        Long adminId = 1L;

        Administrador administrador = mock(Administrador.class);
        when(administrador.getId()).thenReturn(adminId);

        Evento evento = new Evento(
                "Evento Teste",
                LocalDate.of(2026, 9, 20),
                "Petrópolis",
                "evento.jpg",
                administrador);

        when(eventoRepository.findById(eventoId))
                .thenReturn(Optional.of(evento));

        eventoService.excluir(eventoId, adminId);

        verify(eventoRepository).findById(eventoId);
        verify(eventoRepository).delete(evento);
    }

    @Test
    void naoDeveExcluirEventoDeOutroAdministrador() {

        Long eventoId = 1L;
        Long adminIdAutenticado = 2L;
        Long adminIdDonoDoEvento = 1L;

        Administrador administradorDono = mock(Administrador.class);
        when(administradorDono.getId()).thenReturn(adminIdDonoDoEvento);

        Evento evento = new Evento(
                "Evento Teste",
                LocalDate.of(2026, 9, 20),
                "Petrópolis",
                "evento.jpg",
                administradorDono);

        when(eventoRepository.findById(eventoId))
                .thenReturn(Optional.of(evento));

        assertThrows(
                AcessoNegadoException.class,
                () -> eventoService.excluir(eventoId, adminIdAutenticado));

        verify(eventoRepository).findById(eventoId);

        verify(eventoRepository, never())
                .delete(any(Evento.class));
    }

    @Test
    void naoDeveAtualizarEventoInexistente() {

        Long eventoId = 999L;
        Long adminId = 1L;

        EventoUpdateDTO dto = new EventoUpdateDTO(
                LocalDate.of(2026, 10, 10),
                "Rio de Janeiro");

        when(eventoRepository.findById(eventoId))
                .thenReturn(Optional.empty());

        assertThrows(
                EventoNaoEncontradoException.class,
                () -> eventoService.atualizar(eventoId, dto, adminId));

        verify(eventoRepository).findById(eventoId);

        verify(eventoRepository, never())
                .save(any(Evento.class));
    }

    @Test
    void naoDeveExcluirEventoInexistente() {

        Long eventoId = 999L;
        Long adminId = 1L;

        when(eventoRepository.findById(eventoId))
                .thenReturn(Optional.empty());

        assertThrows(
                EventoNaoEncontradoException.class,
                () -> eventoService.excluir(eventoId, adminId));

        verify(eventoRepository).findById(eventoId);

        verify(eventoRepository, never())
                .delete(any(Evento.class));
    }

    @Test
    void deveListarEventosPorAdministrador() {

        Long adminId = 1L;

        Administrador administrador = mock(Administrador.class);
        when(administrador.getId()).thenReturn(adminId);

        Evento evento1 = new Evento(
                "Evento 1",
                LocalDate.of(2026, 9, 20),
                "Petrópolis",
                "evento1.jpg",
                administrador);

        Evento evento2 = new Evento(
                "Evento 2",
                LocalDate.of(2026, 10, 5),
                "Rio de Janeiro",
                "evento2.jpg",
                administrador);

        when(eventoRepository.findByAdministradorId(adminId))
                .thenReturn(List.of(evento1, evento2));

        List<EventoResponseDTO> resposta = eventoService.listarPorAdministrador(adminId);

        assertNotNull(resposta);
        assertEquals(2, resposta.size());
        assertEquals("Evento 1", resposta.get(0).nome());
        assertEquals("Evento 2", resposta.get(1).nome());

        verify(eventoRepository).findByAdministradorId(adminId);
    }
}