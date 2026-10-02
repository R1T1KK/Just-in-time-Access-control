package com.ztvis.controller;

import com.ztvis.model.Host;
import com.ztvis.repository.HostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hosts")
@RequiredArgsConstructor
public class HostController {
    private final HostRepository hostRepository;

    @GetMapping
    public ResponseEntity<List<Host>> getAllHosts() {
        return ResponseEntity.ok(hostRepository.findAll());
    }
}
