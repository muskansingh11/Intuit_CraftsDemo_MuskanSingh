package com.muskan.eventmgmtserver.exceptions;

public class EventNotFoundException extends NotFoundException{
    public EventNotFoundException(String message) {
        super(message);
    }
}
