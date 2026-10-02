package com.ztvis.repository;

import com.ztvis.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    List<Visitor> findByStatus(Visitor.VisitorStatus status);
    
    @Query("SELECT v FROM Visitor v WHERE v.status = 'APPROVED' AND v.accessExpiresAt < :now")
    List<Visitor> findExpiredApprovedVisitors(@Param("now") java.time.Instant now);
}
