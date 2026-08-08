package br.com.neki.gerenciador_eventos.dto.administrador;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdministradorRequestDTO( 
    @NotBlank
    @Size(max = 100)
    String nome,

    @NotBlank
    @Email
    @Size(max = 100)
    String email,

    @NotBlank
    @Size(min = 6, max = 100)
    String senha
) {


}
