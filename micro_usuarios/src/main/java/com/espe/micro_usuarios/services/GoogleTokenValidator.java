package com.espe.micro_usuarios.services;


import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

import java.net.URL;
import java.security.PublicKey;
import java.util.List;

public class GoogleTokenValidator {

    private static final String GOOGLE_KEYS_URL = "https://www.googleapis.com/oauth2/v3/certs";

    public static PublicKey getGooglePublicKey() throws Exception {
        JWKSource<SecurityContext> keySource = new RemoteJWKSet<>(new URL(GOOGLE_KEYS_URL));
        JWKSet jwkSet = JWKSet.load(new URL(GOOGLE_KEYS_URL));

        List<RSAKey> keys = jwkSet.getKeys().stream()
                .map(key -> (RSAKey) key)
                .toList();

        if (!keys.isEmpty()) {
            return keys.get(0).toPublicKey();
        }

        throw new RuntimeException("No se pudo obtener la clave pública de Google");
    }
}
