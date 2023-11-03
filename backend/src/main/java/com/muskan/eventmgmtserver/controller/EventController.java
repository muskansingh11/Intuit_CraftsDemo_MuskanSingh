package com.muskan.eventmgmtserver.controller;

import com.muskan.eventmgmtserver.entity.Event;
import com.muskan.eventmgmtserver.responses.BaseResponse;
import com.muskan.eventmgmtserver.responses.SuccessResponse;
import com.muskan.eventmgmtserver.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
@CrossOrigin
public class EventController {
    EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<BaseResponse> getAllEvents() {
        List<Event> data = eventService.getAllEvents();
        SuccessResponse<List<Event>> response = new SuccessResponse<>(
                HttpStatus.OK.value(),
                "Events fetched successfully.",
                data
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @GetMapping
//    public List<Event> getEvents(@RequestBody Event event) {
//        return eventService.getEvents(event);
//    }
}
