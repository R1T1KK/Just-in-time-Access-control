package com.ztvis.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "access_events")
public class AccessEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long passId;

    @Column(nullable = false)
    private String zone;

    @Column(nullable = false)
    private Instant timestamp;

    private Double riskScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Decision decision;

    private String reason;

    @PrePersist
    protected void onCreate() {
        if (this.timestamp == null) {
            this.timestamp = Instant.now();
        }
    }

    public enum Decision {
        ALLOW,
        DENY,
        STEP_UP
    }

    public AccessEvent() {}
    public AccessEvent(Long id, Long passId, String zone, Instant timestamp, Double riskScore, Decision decision, String reason) {
        this.id = id; this.passId = passId; this.zone = zone; this.timestamp = timestamp; this.riskScore = riskScore; this.decision = decision; this.reason = reason;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getPassId() { return passId; }
    public void setPassId(Long passId) { this.passId = passId; }
    public String getZone() { return zone; }
    public void setZone(String zone) { this.zone = zone; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    public Double getRiskScore() { return riskScore; }
    public void setRiskScore(Double riskScore) { this.riskScore = riskScore; }
    public Decision getDecision() { return decision; }
    public void setDecision(Decision decision) { this.decision = decision; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public static AccessEventBuilder builder() { return new AccessEventBuilder(); }
    public static class AccessEventBuilder {
        private Long id; private Long passId; private String zone; private Instant timestamp; private Double riskScore; private Decision decision; private String reason;
        public AccessEventBuilder id(Long id) { this.id = id; return this; }
        public AccessEventBuilder passId(Long passId) { this.passId = passId; return this; }
        public AccessEventBuilder zone(String zone) { this.zone = zone; return this; }
        public AccessEventBuilder timestamp(Instant timestamp) { this.timestamp = timestamp; return this; }
        public AccessEventBuilder riskScore(Double riskScore) { this.riskScore = riskScore; return this; }
        public AccessEventBuilder decision(Decision decision) { this.decision = decision; return this; }
        public AccessEventBuilder reason(String reason) { this.reason = reason; return this; }
        public AccessEvent build() { return new AccessEvent(id, passId, zone, timestamp, riskScore, decision, reason); }
    }
}
