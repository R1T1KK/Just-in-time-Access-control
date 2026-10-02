package com.ztvis.repository;

import com.ztvis.model.AccessEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccessEventRepository extends JpaRepository<AccessEvent, Long> {
    List<AccessEvent> findTop10ByOrderByTimestampDesc();
}
