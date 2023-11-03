package com.muskan.eventmgmtserver.service;

import com.muskan.eventmgmtserver.entity.Event;
import com.muskan.eventmgmtserver.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    void createUser(User user);
    void registerEvent(Integer userId, Integer eventId);
    List<Event> getEvents(Integer userId);
    void unregisterEvent(Integer userId, Integer eventId);
    User authenticateUser(String username);
}
