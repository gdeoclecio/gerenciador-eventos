package br.com.neki.gerenciador_eventos.service;

import java.time.Instant;

import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import br.com.neki.gerenciador_eventos.entity.Administrador;

@Service
public class JwtService {

    private final JwtEncoder jwtEncoder;

    public JwtService(JwtEncoder jwtEncoder){
        this.jwtEncoder = jwtEncoder;
    }

    public String gerarToken(Administrador administrador) {
        Instant agora = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
        .issuedAt(agora)
        .expiresAt(agora.plusSeconds(3600))
        .subject(administrador.getEmail())
        .claim("adminId", administrador.getId())
        .build();

         return jwtEncoder
            .encode(JwtEncoderParameters.from(claims))
            .getTokenValue();
    }
    
}
