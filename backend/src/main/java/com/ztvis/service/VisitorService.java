package com.ztvis.service;

import com.ztvis.model.Visitor;
import com.ztvis.repository.VisitorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * VisitorService – business logic for visitor identity management and JIT access.
 */
@Service
@Transactional
public class VisitorService {

    private static final Logger log = LoggerFactory.getLogger(VisitorService.class);

    private final VisitorRepository visitorRepository;

    public VisitorService(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    /** Register a new visitor access request. */
    public Visitor registerVisitor(Visitor visitor) {
        log.info("Registering new visitor: {}", visitor.getEmail());
        visitor.setStatus(Visitor.VisitorStatus.PENDING);
        return visitorRepository.save(visitor);
    }

    /** Retrieve all visitors. */
    @Transactional(readOnly = true)
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    /** Find a visitor by ID. */
    @Transactional(readOnly = true)
    public Optional<Visitor> getVisitorById(Long id) {
        return visitorRepository.findById(id);
    }

    /**
     * Grant Just-in-Time access to a visitor for the specified duration (minutes).
     */
    public Visitor grantAccess(Long visitorId, long durationMinutes) {
        Visitor visitor = visitorRepository.findById(visitorId)
            .orElseThrow(() -> new IllegalArgumentException("Visitor not found: " + visitorId));

        Instant now = Instant.now();
        visitor.setStatus(Visitor.VisitorStatus.APPROVED);
        visitor.setAccessGrantedAt(now);
        visitor.setAccessExpiresAt(now.plusSeconds(durationMinutes * 60));

        log.info("JIT access granted to visitor {} for {} minutes", visitorId, durationMinutes);
        return visitorRepository.save(visitor);
    }

    /** Deny or revoke access to a visitor. */
    public Visitor updateStatus(Long visitorId, Visitor.VisitorStatus newStatus) {
        Visitor visitor = visitorRepository.findById(visitorId)
            .orElseThrow(() -> new IllegalArgumentException("Visitor not found: " + visitorId));
        visitor.setStatus(newStatus);
        log.info("Visitor {} status updated to {}", visitorId, newStatus);
        return visitorRepository.save(visitor);
    }

    /**
     * Scheduled job – auto-expire approved visitors whose JIT window has elapsed.
     * Runs every 60 seconds.
     */
    @Scheduled(fixedDelay = 60_000)
    public void expireStaleAccess() {
        List<Visitor> expired = visitorRepository.findExpiredApprovedVisitors(Instant.now());
        expired.forEach(v -> {
            v.setStatus(Visitor.VisitorStatus.EXPIRED);
            log.info("Auto-expired JIT access for visitor {}", v.getId());
        });
        if (!expired.isEmpty()) {
            visitorRepository.saveAll(expired);
        }
    }
}
