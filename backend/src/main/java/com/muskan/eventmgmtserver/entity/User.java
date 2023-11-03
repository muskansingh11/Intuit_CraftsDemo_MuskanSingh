package com.muskan.eventmgmtserver.entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.java.Log;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Log
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;

    @Column
    private String name;

    @Column
    private String username;

    @Column(name = "events_registered")
    private Integer numEvents;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(
            name = "event_user_xref",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private List<Event> events;

    public Event findEvent(int eventId) {
        for(int idx = 0; idx < events.size(); idx++) {
            if(events.get(idx).getId() == eventId) return events.get(idx);
        }
        return null;
    }

    public void addEvent(Event event) { events.add(event); }

    public void removeEvent(Event event) {
        events.remove(event);
    }
}
