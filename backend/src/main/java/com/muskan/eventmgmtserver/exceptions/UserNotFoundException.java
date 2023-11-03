package com.muskan.eventmgmtserver.exceptions;

public class UserNotFoundException extends NotFoundException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
