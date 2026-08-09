package br.com.neki.gerenciador_eventos.service;

import java.util.List;


import org.springframework.stereotype.Service;

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

@Service
public class EventoService {

    private final EventoRepository eventoRepository;
    private final AdministradorRepository administradorRepository;

    public EventoService(EventoRepository eventoRepository, AdministradorRepository administradorRepository){
        this.eventoRepository = eventoRepository;
        this.administradorRepository = administradorRepository;
    }

    private EventoResponseDTO toResponseDTO(Evento evento) {
    return new EventoResponseDTO(
        evento.getId(),
        evento.getNome(),
        evento.getData(),
        evento.getLocalizacao(),
        evento.getImagem(),
        evento.getAdministrador().getId()
    );
}

public List<EventoResponseDTO> listarPorAdministrador(Long adminId) {
    return eventoRepository.findByAdministradorId(adminId)
        .stream()
        .map(this::toResponseDTO)
        .toList();
}
    public EventoResponseDTO cadastrar (EventoRequestDTO dto, Long adminId){
        Administrador administrador = administradorRepository
        .findById(adminId)
        .orElseThrow(() -> new AdministradorNaoEncontradoException("Administrador não encontrado"));

        Evento evento = new Evento(
            dto.nome(),
            dto.data(),
            dto.localizacao(),
            dto.imagem(),
            administrador
        );
        Evento salvo = eventoRepository.save(evento);
        return toResponseDTO(salvo);
    }

    public EventoResponseDTO atualizar(Long eventoId, EventoUpdateDTO dto, Long adminId){
        if (dto.data() == null && (dto.localizacao() == null || dto.localizacao().isBlank())) {
            throw new IllegalArgumentException("Informe a data ou a localização para atualização ");
        }
        Evento evento = eventoRepository.findById(eventoId)
        .orElseThrow(() -> new EventoNaoEncontradoException("Evento não encontrado"));

        if(!evento.getAdministrador().getId().equals(adminId)) {
            throw new AcessoNegadoException("Acesso não autorizado");
        }

        if (dto.data() != null){
            evento.setData(dto.data());
        }
        if (dto.localizacao() != null && !dto.localizacao().isBlank()){
            evento.setLocalizacao(dto.localizacao());
        }
        Evento salvo = eventoRepository.save(evento);
        return toResponseDTO(salvo);
    }
    
    public void excluir(Long eventoId, Long adminId){
        Evento evento = eventoRepository.findById(eventoId)
        .orElseThrow(()-> new EventoNaoEncontradoException("Evento não encontrado"));

        if(!evento.getAdministrador().getId().equals(adminId)) {
            throw new AcessoNegadoException("Acesso não autorizado");
        }

        eventoRepository.delete(evento);
    }
}
