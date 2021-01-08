package com.revature.controllers;

import java.io.IOException;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.exceptions.UserNotFoundException;
import com.revature.models.Credentials;
import com.revature.models.User;
import com.revature.repositories.UserPostgresDAO;
import com.revature.services.UserService;
import com.revature.services.UserServiceImplementation;

public class AuthController {
	
	private UserService us = new UserServiceImplementation(new UserPostgresDAO());
		
	private ObjectMapper om = new ObjectMapper();
	
	public void userLogin(HttpServletRequest request, HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException, UserNotFoundException {
		Credentials cred = om.readValue(request.getInputStream(), Credentials.class);
		
		User u = (User) us.loginService(cred.getUsername(), cred.getPassword());
		System.out.println(cred);
		response.setStatus(200);
		response.getWriter().write(om.writeValueAsString(u));
	}

}
