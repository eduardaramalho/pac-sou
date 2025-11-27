package com.example.crud.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.crud.model.entity.User;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Optional;

@Component
public class TokenConfig {
    private String secret = "secretKey123";

    public String genetateToken(User user) {

        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create().withClaim("userId", user.getId()).withSubject(user.getEmail()).withSubject(user.getRole()).withExpiresAt(Instant.now().plusSeconds(3600)).withIssuedAt(Instant.now()).sign(algorithm);
    }

    public Optional<JWTUserData> validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            DecodedJWT decode = JWT.require(algorithm).build().verify(token);

            return Optional.of(new JWTUserData(decode.getClaim("userId").asLong(), decode.getSubject()));
        } catch (JWTVerificationException exception) {
            return Optional.empty();
        }
    }
}
