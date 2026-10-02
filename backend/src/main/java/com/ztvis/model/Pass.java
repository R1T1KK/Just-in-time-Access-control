package com.ztvis.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "passes")
public class Pass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long visitorId;

    @Column(nullable = false, length = 1024)
    private String qrToken;

    @Column(nullable = false)
    private Instant issuedAt;

    @Column(nullable = false)
    private Instant expiresAt;

    @Column(nullable = false)
    private String zone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PassStatus status;

    public enum PassStatus {
        PENDING,
        ACTIVE,
        EXPIRED,
        REVOKED
    }

    public Pass() {}
    public Pass(Long id, Long visitorId, String qrToken, Instant issuedAt, Instant expiresAt, String zone, PassStatus status) {
        this.id = id; this.visitorId = visitorId; this.qrToken = qrToken; this.issuedAt = issuedAt; this.expiresAt = expiresAt; this.zone = zone; this.status = status;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getVisitorId() { return visitorId; }
    public void setVisitorId(Long visitorId) { this.visitorId = visitorId; }
    public String getQrToken() { return qrToken; }
    public void setQrToken(String qrToken) { this.qrToken = qrToken; }
    public Instant getIssuedAt() { return issuedAt; }
    public void setIssuedAt(Instant issuedAt) { this.issuedAt = issuedAt; }
    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }
    public String getZone() { return zone; }
    public void setZone(String zone) { this.zone = zone; }
    public PassStatus getStatus() { return status; }
    public void setStatus(PassStatus status) { this.status = status; }

    public static PassBuilder builder() { return new PassBuilder(); }
    public static class PassBuilder {
        private Long id; private Long visitorId; private String qrToken; private Instant issuedAt; private Instant expiresAt; private String zone; private PassStatus status;
        public PassBuilder id(Long id) { this.id = id; return this; }
        public PassBuilder visitorId(Long visitorId) { this.visitorId = visitorId; return this; }
        public PassBuilder qrToken(String qrToken) { this.qrToken = qrToken; return this; }
        public PassBuilder issuedAt(Instant issuedAt) { this.issuedAt = issuedAt; return this; }
        public PassBuilder expiresAt(Instant expiresAt) { this.expiresAt = expiresAt; return this; }
        public PassBuilder zone(String zone) { this.zone = zone; return this; }
        public PassBuilder status(PassStatus status) { this.status = status; return this; }
        public Pass build() { return new Pass(id, visitorId, qrToken, issuedAt, expiresAt, zone, status); }
    }
}
