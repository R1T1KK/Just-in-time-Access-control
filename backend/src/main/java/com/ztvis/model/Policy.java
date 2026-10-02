package com.ztvis.model;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "policies")
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String zone;

    @Column(nullable = false)
    private LocalTime allowedStartTime;

    @Column(nullable = false)
    private LocalTime allowedEndTime;

    @Column(nullable = false)
    private Double riskThreshold;

    public Policy() {}
    public Policy(Long id, String zone, LocalTime allowedStartTime, LocalTime allowedEndTime, Double riskThreshold) {
        this.id = id; this.zone = zone; this.allowedStartTime = allowedStartTime; this.allowedEndTime = allowedEndTime; this.riskThreshold = riskThreshold;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getZone() { return zone; }
    public void setZone(String zone) { this.zone = zone; }
    public LocalTime getAllowedStartTime() { return allowedStartTime; }
    public void setAllowedStartTime(LocalTime allowedStartTime) { this.allowedStartTime = allowedStartTime; }
    public LocalTime getAllowedEndTime() { return allowedEndTime; }
    public void setAllowedEndTime(LocalTime allowedEndTime) { this.allowedEndTime = allowedEndTime; }
    public Double getRiskThreshold() { return riskThreshold; }
    public void setRiskThreshold(Double riskThreshold) { this.riskThreshold = riskThreshold; }

    public static PolicyBuilder builder() { return new PolicyBuilder(); }
    public static class PolicyBuilder {
        private Long id; private String zone; private LocalTime allowedStartTime; private LocalTime allowedEndTime; private Double riskThreshold;
        public PolicyBuilder id(Long id) { this.id = id; return this; }
        public PolicyBuilder zone(String zone) { this.zone = zone; return this; }
        public PolicyBuilder allowedStartTime(LocalTime allowedStartTime) { this.allowedStartTime = allowedStartTime; return this; }
        public PolicyBuilder allowedEndTime(LocalTime allowedEndTime) { this.allowedEndTime = allowedEndTime; return this; }
        public PolicyBuilder riskThreshold(Double riskThreshold) { this.riskThreshold = riskThreshold; return this; }
        public Policy build() { return new Policy(id, zone, allowedStartTime, allowedEndTime, riskThreshold); }
    }
}
