package com.espe.micro_usuarios.controllers;

import com.espe.micro_usuarios.models.dto.UsuarioDTO;
import com.espe.micro_usuarios.models.entities.Usuarios;
import com.espe.micro_usuarios.services.GoogleTokenVerifierService;
import com.espe.micro_usuarios.services.JwtUserDetailsService;
import com.espe.micro_usuarios.services.UsuarioService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private GoogleTokenVerifierService googleTokenVerifierService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    private static final String SECRET_KEY = "secreto_seguro";

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token no proporcionado o formato incorrecto");
        }

        String token = authHeader.substring(7);
        Map<String, Object> payload = googleTokenVerifierService.verifyToken(token);

        if (payload == null) {
            return ResponseEntity.status(401).body("Token de Google inválido");
        }

        String email = (String) payload.get("email");
        String nombre = (String) payload.get("name");

        // Buscar si el usuario ya existe en la BD
        Usuarios usuario = usuarioService.findByEmail(email).orElseGet(() -> {
            Usuarios nuevoUsuario = new Usuarios();
            nuevoUsuario.setEmail(email);
            nuevoUsuario.setNombre(nombre);
            return usuarioService.save(nuevoUsuario);
        });

        // Generar un JWT propio
        String jwtToken = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 horas de validez
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();

        return ResponseEntity.ok().body(Map.of(
                "jwt", jwtToken,
                "email", usuario.getEmail(),
                "nombre", usuario.getNombre()
        ));
    }
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserData(@PathVariable String email) {
        Optional<Usuarios> usuario = usuarioService.findByEmail(email);
        return usuario.map(value -> ResponseEntity.ok(new UsuarioDTO(
                value.getId(), value.getNombre(), value.getApellido(),
                value.getEmail(), value.getTelefono(), value.getFechaNacimiento(),
                value.getCreadoEn()
        ))).orElseGet(() -> ResponseEntity.status(404).body(null));
    }
}
