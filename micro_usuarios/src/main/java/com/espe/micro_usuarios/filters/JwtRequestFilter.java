package com.espe.micro_usuarios.filters;

import com.espe.micro_usuarios.services.GoogleTokenVerifierService;
import com.espe.micro_usuarios.services.JwtUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private GoogleTokenVerifierService googleTokenVerifierService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String jwt = authorizationHeader.substring(7);
        String username = null;
        List<String> roles = null;

        try {
            // Intentamos validar el token como un JWT de Google (RS256)
            if (jwt.contains(".")) {
                var payload = googleTokenVerifierService.verifyToken(jwt);
                if (payload != null) {
                    username = payload.getEmail();
                    roles = List.of("ROLE_USER"); // Los usuarios de Google tienen rol USER por defecto
                }
            } else {
                // Si falla, lo intentamos como un token interno (HS512)
                Jws<Claims> claimsJws = Jwts.parser()
                        .setSigningKey(jwtUserDetailsService.getSecretKey())
                        .parseClaimsJws(jwt);
                username = claimsJws.getBody().getSubject();
                roles = (List<String>) claimsJws.getBody().get("roles");
            }
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token inválido");
            return;
        }

        if (username != null) {
            List<GrantedAuthority> authorities = roles.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(username, null, authorities);

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        chain.doFilter(request, response);
    }
}