package com.ztvis.service;

import com.ztvis.model.Pass;
import com.ztvis.model.Visitor;
import com.ztvis.repository.PassRepository;
import com.ztvis.repository.VisitorRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class PassService {
    private final PassRepository passRepository;
    private final VisitorRepository visitorRepository;

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public Pass issuePass(Long visitorId, String zone) {
        Visitor visitor = visitorRepository.findById(visitorId)
                .orElseThrow(() -> new IllegalArgumentException("Visitor not found"));
        
        visitor.setStatus(Visitor.VisitorStatus.APPROVED);
        visitorRepository.save(visitor);

        Instant now = Instant.now();
        Instant expiresAt = now.plus(2, ChronoUnit.HOURS);

        String qrToken = Jwts.builder()
                .subject(visitorId.toString())
                .claim("zone", zone)
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiresAt))
                .signWith(getSigningKey())
                .compact();

        Pass pass = Pass.builder()
                .visitorId(visitorId)
                .qrToken(qrToken)
                .issuedAt(now)
                .expiresAt(expiresAt)
                .zone(zone)
                .status(Pass.PassStatus.ACTIVE)
                .build();

        return passRepository.save(pass);
    }

    public Claims verifyToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            return null;
        }
    }
}
