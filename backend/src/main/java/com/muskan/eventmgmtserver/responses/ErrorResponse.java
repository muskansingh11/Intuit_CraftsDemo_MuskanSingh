package com.muskan.eventmgmtserver.responses;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class ErrorResponse implements BaseResponse{
    Integer status;
    String message;
    LocalDateTime timestamp;
    public ErrorResponse(Integer status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
