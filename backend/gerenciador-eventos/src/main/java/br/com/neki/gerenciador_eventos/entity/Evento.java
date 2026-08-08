package br.com.neki.gerenciador_eventos.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity 
public class Evento {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false, length = 100)
    private String localizacao;

    @Column(length = 255)
    private String imagem; 
    
    //muitos eventos para um adm
    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private Administrador administrador;
}
