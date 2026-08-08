package br.com.neki.gerenciador_eventos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.neki.gerenciador_eventos.entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByAdministradorId(Long administradorId);
}
