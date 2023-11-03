package com.muskan.eventmgmtserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private String name;

    @Column
    private String category;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
//    @JoinTable(
//            name = "event_user_xref",
//            joinColumns = @JoinColumn(name="event_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id")
//    )
//    @JsonIgnore
//    private List<User> users;
}
