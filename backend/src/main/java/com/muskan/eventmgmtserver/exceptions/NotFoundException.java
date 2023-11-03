package com.muskan.eventmgmtserver.exceptions;

public abstract class NotFoundException extends RuntimeException{
    public NotFoundException(String message) {
        super(message);
    }
}
