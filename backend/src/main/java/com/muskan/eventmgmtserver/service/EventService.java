package com.muskan.eventmgmtserver.service;

import com.muskan.eventmgmtserver.entity.Event;

import java.util.List;

public interface EventService {
    List<Event> getAllEvents();
}
