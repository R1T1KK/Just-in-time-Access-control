package com.ztvis.controller;

import com.ztvis.model.Pass;
import com.ztvis.service.PassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/passes")
@RequiredArgsConstructor
public class PassController {
    private final PassService passService;

    @PostMapping("/issue/{visitorId}")
    public ResponseEntity<Pass> issuePass(@PathVariable Long visitorId, @RequestBody Map<String, String> body) {
        String zone = body.getOrDefault("zone", "Main Lobby");
        Pass pass = passService.issuePass(visitorId, zone);
        return ResponseEntity.ok(pass);
    }
}
