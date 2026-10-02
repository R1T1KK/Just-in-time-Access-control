package com.ztvis.controller;

import com.ztvis.model.Visitor;
import com.ztvis.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitors")
@RequiredArgsConstructor
public class VisitorController {
    private final VisitorRepository visitorRepository;

    @GetMapping
    public ResponseEntity<List<Visitor>> getAllVisitors() {
        return ResponseEntity.ok(visitorRepository.findAll());
    }
    
    @GetMapping("/pending")
    public ResponseEntity<List<Visitor>> getPendingVisitors() {
        return ResponseEntity.ok(visitorRepository.findByStatus(Visitor.VisitorStatus.PENDING));
    }

    @PostMapping("/preregister")
    public ResponseEntity<Visitor> preregister(@RequestBody Visitor visitor) {
        visitor.setStatus(Visitor.VisitorStatus.PENDING);
        Visitor saved = visitorRepository.save(visitor);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
