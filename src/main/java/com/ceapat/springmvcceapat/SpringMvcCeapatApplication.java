package com.ceapat.springmvcceapat;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class SpringMvcCeapatApplication {

	public static void main(String[] args) {
		//SpringApplication.run(SpringMvcCeapatApplication.class, args);
		SpringApplication app = new SpringApplication(SpringMvcCeapatApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.servlet.context-path", "/"));
		app.run(args);
		
	}

}
