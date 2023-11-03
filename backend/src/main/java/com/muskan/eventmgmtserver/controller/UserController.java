package com.muskan.eventmgmtserver.controller;

import com.muskan.eventmgmtserver.dto.LoginDTO;
import com.muskan.eventmgmtserver.dto.RegisterDTO;
import com.muskan.eventmgmtserver.entity.Event;
import com.muskan.eventmgmtserver.entity.User;
import com.muskan.eventmgmtserver.responses.BaseResponse;
import com.muskan.eventmgmtserver.responses.SuccessResponse;
import com.muskan.eventmgmtserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @CrossOrigin
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint for user signup
    @PostMapping
    @CrossOrigin
    public ResponseEntity<BaseResponse> addUser(@RequestBody User user) {
        userService.createUser(user);
        SuccessResponse<String> response = new SuccessResponse<>(
                HttpStatus.CREATED.value(),
                "User signup was successful."
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    // Endpoint for user login
    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<BaseResponse> authenticate(@RequestBody LoginDTO loginDTO) {
        User user = userService.authenticateUser(loginDTO.getUsername());
        SuccessResponse<User> response = new SuccessResponse<>(
                HttpStatus.OK.value(),
                "User log in was successful.",
                user
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Endpoint for all events of a particular user
    @GetMapping("/{userId}/event")
    @CrossOrigin
    public ResponseEntity<BaseResponse> getUserEvents(@PathVariable Integer userId) {
        List<Event> data = userService.getEvents(userId);
        SuccessResponse<List<Event>> response = new SuccessResponse<>(
                HttpStatus.OK.value(),
                "User events fetched successfully.",
                data
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Endpoint to register user for an event
    @PostMapping("/{userId}/event")
    @CrossOrigin
    public ResponseEntity<BaseResponse> registerEvent(@PathVariable Integer userId, @RequestBody RegisterDTO registerDTO) {
        userService.registerEvent(userId, registerDTO.getEventId());
        SuccessResponse<String> response = new SuccessResponse<>(
                HttpStatus.CREATED.value(),
                "User registered for event successfully.",
                null
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    // Endpoint to unregister user from an event
    @DeleteMapping("/{userId}/event/{eventId}")
    @CrossOrigin
    public ResponseEntity<BaseResponse> unregisterEvent(@PathVariable Integer userId, @PathVariable Integer eventId) {
        userService.unregisterEvent(userId, eventId);
        SuccessResponse<String> response = new SuccessResponse<>(
                HttpStatus.OK.value(),
                "User unregistered for event successfully.",
                null
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
