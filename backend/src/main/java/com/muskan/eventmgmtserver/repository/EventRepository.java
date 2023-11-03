package com.muskan.eventmgmtserver.repository;

import com.muskan.eventmgmtserver.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

//    @Query("Select * from events where start_time=${0}")
    List<Event> findByStartTime(LocalDateTime startTime);
}
