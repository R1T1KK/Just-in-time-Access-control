package com.ztvis.service;

import com.ztvis.model.Pass;
import com.ztvis.model.Policy;
import com.ztvis.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
public class RiskEngine {
    
    private final PolicyRepository policyRepository;

    /**
     * Computes risk score for an access attempt.
     * Currently uses simple rule-based logic.
     * Future enhancement: Plug in ML-based anomaly detection here.
     */
    public double scoreRisk(Pass pass, String requestedZone, Instant timestamp) {
        Policy policy = policyRepository.findByZone(requestedZone).orElse(null);
        if (policy == null) {
            return 100.0; // High risk if zone unknown or no policy
        }

        double riskScore = 0.0;

        // Rule 1: Zone match
        if (!requestedZone.equals(pass.getZone())) {
            riskScore += 50.0;
        }

        // Rule 2: Time of day
        LocalTime attemptTime = LocalTime.ofInstant(timestamp, ZoneId.systemDefault());
        if (attemptTime.isBefore(policy.getAllowedStartTime()) || attemptTime.isAfter(policy.getAllowedEndTime())) {
            riskScore += 40.0;
        }

        return riskScore;
    }
}
