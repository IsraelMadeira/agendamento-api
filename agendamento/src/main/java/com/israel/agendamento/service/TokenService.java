package com.israel.agendamento.service;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {
    private static final Duration TOKEN_TTL = Duration.ofHours(8);

    private final ConcurrentHashMap<String, SessionToken> sessions = new ConcurrentHashMap<>();

    public String issueToken(UUID userId) {
        String token = UUID.randomUUID().toString();
        sessions.put(token, new SessionToken(userId, Instant.now().plus(TOKEN_TTL)));
        return token;
    }

    public UUID resolveUserId(String token) {
        SessionToken session = sessions.get(token);
        if (session == null) {
            return null;
        }

        if (Instant.now().isAfter(session.expiresAt())) {
            sessions.remove(token);
            return null;
        }

        return session.userId();
    }

    private record SessionToken(UUID userId, Instant expiresAt) {
    }
}
