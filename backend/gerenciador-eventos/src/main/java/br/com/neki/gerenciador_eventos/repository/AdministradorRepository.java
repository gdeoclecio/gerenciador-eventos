package br.com.neki.gerenciador_eventos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.neki.gerenciador_eventos.entity.Administrador;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    
    boolean existsByEmail(String email);

    Optional<Administrador> findByEmail(String email);
}
