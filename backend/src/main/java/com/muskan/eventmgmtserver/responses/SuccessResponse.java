package com.muskan.eventmgmtserver.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
public class SuccessResponse<T> implements BaseResponse{
    Integer status;
    String message;
    T data;

    public SuccessResponse(Integer status, String message) {
        this.status = status;
        this.message = message;
    }

    public SuccessResponse(Integer status, String message, T data) {
        this(status, message);
        this.data = data;
    }
}
