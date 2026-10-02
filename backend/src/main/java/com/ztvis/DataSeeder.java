package com.ztvis;

import com.ztvis.model.Host;
import com.ztvis.model.Policy;
import com.ztvis.model.Visitor;
import com.ztvis.repository.HostRepository;
import com.ztvis.repository.PolicyRepository;
import com.ztvis.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ztvis.model.AppUser;
import com.ztvis.repository.AppUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalTime;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final HostRepository hostRepository;
    private final VisitorRepository visitorRepository;
    private final PolicyRepository policyRepository;
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (appUserRepository.count() == 0) {
            appUserRepository.save(AppUser.builder()
                .username("employee")
                .email("employee@ztvis.com")
                .passwordHash(passwordEncoder.encode("demo"))
                .roles(Set.of("EMPLOYEE"))
                .build());
                
            appUserRepository.save(AppUser.builder()
                .username("host")
                .email("host@ztvis.com")
                .passwordHash(passwordEncoder.encode("demo"))
                .roles(Set.of("HOST"))
                .build());
                
            appUserRepository.save(AppUser.builder()
                .username("security")
                .email("security@ztvis.com")
                .passwordHash(passwordEncoder.encode("demo"))
                .roles(Set.of("SECURITY"))
                .build());
                
            appUserRepository.save(AppUser.builder()
                .username("admin")
                .email("admin@ztvis.com")
                .passwordHash(passwordEncoder.encode("demo"))
                .roles(Set.of("ADMIN"))
                .build());
        }

        if (hostRepository.count() > 0) {
            return;
        }

        Host host1 = hostRepository.save(Host.builder().fullName("Sudhanshu Mishra").email("sudhanshu@ztvis.com").department("IT").build());
        Host host2 = hostRepository.save(Host.builder().fullName("Vishal Vishwakarma").email("vishal@ztvis.com").department("Management").build());

        visitorRepository.save(Visitor.builder().fullName("Charlie Guest").email("charlie@demo.com").phone("555-1234").purposeOfVisit("Meeting").hostId(host1.getId()).status(Visitor.VisitorStatus.PENDING).build());
        visitorRepository.save(Visitor.builder().fullName("Dave Technician").email("dave@tech.com").phone("555-9876").purposeOfVisit("Server Maintenance").hostId(host1.getId()).status(Visitor.VisitorStatus.APPROVED).build());
        visitorRepository.save(Visitor.builder().fullName("Eve Partner").email("eve@partner.com").phone("555-5555").purposeOfVisit("Business Review").hostId(host2.getId()).status(Visitor.VisitorStatus.PENDING).build());

        policyRepository.save(Policy.builder().zone("Main Lobby").allowedStartTime(LocalTime.of(8, 0)).allowedEndTime(LocalTime.of(18, 0)).riskThreshold(50.0).build());
        policyRepository.save(Policy.builder().zone("Server Room").allowedStartTime(LocalTime.of(9, 0)).allowedEndTime(LocalTime.of(17, 0)).riskThreshold(20.0).build());
        policyRepository.save(Policy.builder().zone("Executive Floor").allowedStartTime(LocalTime.of(8, 30)).allowedEndTime(LocalTime.of(17, 30)).riskThreshold(30.0).build());
    }
}
