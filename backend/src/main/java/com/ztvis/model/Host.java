package com.ztvis.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hosts")
public class Host {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    private String department;

    public Host() {}
    public Host(Long id, String fullName, String email, String department) {
        this.id = id; this.fullName = fullName; this.email = email; this.department = department;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public static HostBuilder builder() { return new HostBuilder(); }
    public static class HostBuilder {
        private Long id; private String fullName; private String email; private String department;
        public HostBuilder id(Long id) { this.id = id; return this; }
        public HostBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public HostBuilder email(String email) { this.email = email; return this; }
        public HostBuilder department(String department) { this.department = department; return this; }
        public Host build() { return new Host(id, fullName, email, department); }
    }
}
