package com.ztvis.controller;

import com.ztvis.model.AccessEvent;
import com.ztvis.model.Pass;
import com.ztvis.model.Policy;
import com.ztvis.repository.AccessEventRepository;
import com.ztvis.repository.PassRepository;
import com.ztvis.repository.PolicyRepository;
import com.ztvis.service.PassService;
import com.ztvis.service.RiskEngine;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/access")
@RequiredArgsConstructor
public class AccessController {

    private final PassService passService;
    private final RiskEngine riskEngine;
    private final PassRepository passRepository;
    private final AccessEventRepository accessEventRepository;
    private final PolicyRepository policyRepository;

    @PostMapping("/verify")
    public ResponseEntity<AccessEvent> verifyAccess(@RequestBody Map<String, String> request) {
        String token = request.get("qrToken");
        String requestedZone = request.get("zone");
        Instant now = Instant.now();

        Claims claims = passService.verifyToken(token);
        
        if (claims == null) {
            return logAndReturnEvent(null, requestedZone, now, null, AccessEvent.Decision.DENY, "invalid_or_expired_token");
        }
        
        Pass pass = passRepository.findByQrToken(token).orElse(null);
        if (pass == null || pass.getStatus() != Pass.PassStatus.ACTIVE) {
            return logAndReturnEvent(pass != null ? pass.getId() : null, requestedZone, now, null, AccessEvent.Decision.DENY, "pass_not_active_or_not_found");
        }

        double riskScore = riskEngine.scoreRisk(pass, requestedZone, now);
        Policy policy = policyRepository.findByZone(requestedZone).orElse(null);
        
        double threshold = policy != null ? policy.getRiskThreshold() : 30.0;
        
        AccessEvent.Decision decision;
        String reason;
        
        if (riskScore < threshold) {
            decision = AccessEvent.Decision.ALLOW;
            reason = "risk_score_acceptable";
        } else if (riskScore < threshold + 20.0) {
            decision = AccessEvent.Decision.STEP_UP;
            reason = "risk_score_marginal_step_up_required";
        } else {
            decision = AccessEvent.Decision.DENY;
            reason = "risk_score_too_high";
        }

        return logAndReturnEvent(pass.getId(), requestedZone, now, riskScore, decision, reason);
    }

    private ResponseEntity<AccessEvent> logAndReturnEvent(Long passId, String zone, Instant timestamp, Double riskScore, AccessEvent.Decision decision, String reason) {
        AccessEvent event = AccessEvent.builder()
                .passId(passId)
                .zone(zone)
                .timestamp(timestamp)
                .riskScore(riskScore)
                .decision(decision)
                .reason(reason)
                .build();
        accessEventRepository.save(event);
        return ResponseEntity.ok(event);
    }

    @GetMapping("/events")
    public ResponseEntity<List<AccessEvent>> getRecentEvents() {
        return ResponseEntity.ok(accessEventRepository.findTop10ByOrderByTimestampDesc());
    }
}
