package com.ztvis.repository;

import com.ztvis.model.Pass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PassRepository extends JpaRepository<Pass, Long> {
    Optional<Pass> findByQrToken(String qrToken);
}
