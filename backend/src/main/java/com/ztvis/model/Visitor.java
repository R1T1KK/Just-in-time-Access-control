package com.ztvis.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "visitors")
public class Visitor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    private String phone;

    private String purposeOfVisit;

    @Column(nullable = false)
    private Long hostId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VisitorStatus status;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    private Instant accessGrantedAt;

    private Instant accessExpiresAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
        if (this.status == null) {
            this.status = VisitorStatus.PENDING;
        }
    }

    public Visitor() {}
    public Visitor(Long id, String fullName, String email, String phone, String purposeOfVisit, Long hostId, VisitorStatus status, Instant createdAt, Instant accessGrantedAt, Instant accessExpiresAt) {
        this.id = id; this.fullName = fullName; this.email = email; this.phone = phone; this.purposeOfVisit = purposeOfVisit; this.hostId = hostId; this.status = status; this.createdAt = createdAt; this.accessGrantedAt = accessGrantedAt; this.accessExpiresAt = accessExpiresAt;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getPurposeOfVisit() { return purposeOfVisit; }
    public void setPurposeOfVisit(String purposeOfVisit) { this.purposeOfVisit = purposeOfVisit; }
    public Long getHostId() { return hostId; }
    public void setHostId(Long hostId) { this.hostId = hostId; }
    public VisitorStatus getStatus() { return status; }
    public void setStatus(VisitorStatus status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getAccessGrantedAt() { return accessGrantedAt; }
    public void setAccessGrantedAt(Instant accessGrantedAt) { this.accessGrantedAt = accessGrantedAt; }
    public Instant getAccessExpiresAt() { return accessExpiresAt; }
    public void setAccessExpiresAt(Instant accessExpiresAt) { this.accessExpiresAt = accessExpiresAt; }

    public static VisitorBuilder builder() { return new VisitorBuilder(); }
    public static class VisitorBuilder {
        private Long id; private String fullName; private String email; private String phone; private String purposeOfVisit; private Long hostId; private VisitorStatus status; private Instant createdAt; private Instant accessGrantedAt; private Instant accessExpiresAt;
        public VisitorBuilder id(Long id) { this.id = id; return this; }
        public VisitorBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public VisitorBuilder email(String email) { this.email = email; return this; }
        public VisitorBuilder phone(String phone) { this.phone = phone; return this; }
        public VisitorBuilder purposeOfVisit(String purposeOfVisit) { this.purposeOfVisit = purposeOfVisit; return this; }
        public VisitorBuilder hostId(Long hostId) { this.hostId = hostId; return this; }
        public VisitorBuilder status(VisitorStatus status) { this.status = status; return this; }
        public VisitorBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public VisitorBuilder accessGrantedAt(Instant accessGrantedAt) { this.accessGrantedAt = accessGrantedAt; return this; }
        public VisitorBuilder accessExpiresAt(Instant accessExpiresAt) { this.accessExpiresAt = accessExpiresAt; return this; }
        public Visitor build() { return new Visitor(id, fullName, email, phone, purposeOfVisit, hostId, status, createdAt, accessGrantedAt, accessExpiresAt); }
    }

    public enum VisitorStatus {
        PENDING,
        APPROVED,
        DENIED,
        REVOKED,
        EXPIRED
    }
}
