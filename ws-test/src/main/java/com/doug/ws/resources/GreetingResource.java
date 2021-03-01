package com.doug.ws.resources;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.doug.ws.entities.Greeting;
import com.doug.ws.entities.HelloMessage;

@RestController
public class GreetingResource {
	
	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greeting greeting(HelloMessage message) {
		System.out.println("Nome: " + message.getName());
		return new Greeting("Hello, " + message.getName());
	}
	
}
