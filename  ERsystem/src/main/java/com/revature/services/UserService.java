package com.revature.services;

import com.revature.exceptions.UserNotFoundException;
import com.revature.models.User;


public interface UserService {

	public User loginService(String username, String password) throws UserNotFoundException;
	
	
}
