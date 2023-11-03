package com.muskan.eventmgmtserver.service;

import com.muskan.eventmgmtserver.entity.Event;
import com.muskan.eventmgmtserver.entity.User;
import com.muskan.eventmgmtserver.exceptions.*;
import com.muskan.eventmgmtserver.repository.EventRepository;
import com.muskan.eventmgmtserver.repository.UserRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Log
public class UserServiceImpl implements UserService{
    UserRepository userRepository;
    EventRepository eventRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public void createUser(User user) throws BadRequestException, DuplicateResourceException {
        if(user.getId() != null || user.getNumEvents() != null || user.getUsername() == null || user.getName() == null)
            throw new BadRequestException("One or more arguments are missing and/or invalid.");
        if(userRepository.existsByUsername(user.getUsername()))
            throw new DuplicateResourceException("User with this username already exists.");
        user.setNumEvents(0);
        userRepository.save(user);
    }

    @Override
    public User authenticateUser(String username) throws UserNotFoundException {
        if(!userRepository.existsByUsername(username))
            throw new UserNotFoundException("User with username " + username + " does not exist.");
        return userRepository.findByUsername(username);
    }

    @Override
    @Transactional
    public void registerEvent(Integer userId, Integer eventId) throws NotFoundException, DuplicateResourceException, BadRequestException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with user ID" + userId + " not found."));
        if(user.findEvent(eventId) != null)
            throw new DuplicateResourceException("User is already registered to this event.");
        if(user.getEvents().size() == 3) throw new BadRequestException("User is already registered for three events.");
        Event newEvent = eventRepository.findById(eventId).orElseThrow(() -> new EventNotFoundException("Event with event ID" + eventId + " not found."));
        for(Event event: user.getEvents()) {
            if(newEvent.getStartTime().isAfter(event.getEndTime()) || newEvent.getEndTime().isBefore(event.getStartTime())) continue;
            throw new BadRequestException("User has a conflict in their schedule.");
        }
        user.addEvent(newEvent);
        user.setNumEvents(user.getNumEvents() + 1);
        userRepository.saveAndFlush(user);
    }

    @Override
    public List<Event> getEvents(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with user ID" + userId + " not found."));
        return user.getEvents();
    }

    @Override
    @Transactional
    public void unregisterEvent(Integer userId, Integer eventId) throws NotFoundException{
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with user ID " + userId + " not found."));
        Event event = user.findEvent(eventId);
        if(event == null) throw new EventNotFoundException("Event with event ID " + eventId + " not found.");
        user.removeEvent(event);
        user.setNumEvents(user.getNumEvents() - 1);
        userRepository.saveAndFlush(user);
    }
}
