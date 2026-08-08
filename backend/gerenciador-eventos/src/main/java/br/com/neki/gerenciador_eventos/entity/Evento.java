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

    public Evento(){}

    public Evento(String nome, LocalDate data, String localizacao, String imagem, Administrador administrador){
        this.nome = nome;
        this.data = data;
        this.localizacao = localizacao;
        this.imagem = imagem;
        this.administrador = administrador;
    }
    public Long getId(){
        return id;
    }


    public String getNome(){
        return nome;
    }
    public void setNome(String nome){
        this.nome = nome;
    }
    public LocalDate getData(){
        return data;
    }
    public void setData(LocalDate data){
        this.data = data;
    }
    public String getLocalizacao(){
        return localizacao;
    }
    public void setLocalizacao(String localizacao){
        this.localizacao = localizacao;
    }
    public String getImagem(){
        return imagem;
    }
    public void setImagem(String imagem){
        this.imagem = imagem;
    }

    public Administrador getAdministrador(){
        return administrador;
    }
    public void setAdministrador(Administrador administrador){
        this.administrador = administrador;
    }
}
