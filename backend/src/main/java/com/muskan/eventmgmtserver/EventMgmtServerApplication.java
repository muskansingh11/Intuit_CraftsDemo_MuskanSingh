package com.muskan.eventmgmtserver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(ignoreResourceNotFound = true, value = "file:src/main/resources/vault/secrets.properties")
public class EventMgmtServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(EventMgmtServerApplication.class, args);
	}

}
