package com.revature.services;


import com.revature.exceptions.UserNotFoundException;
import com.revature.models.User;
import com.revature.repositories.UserDAO;

public class UserServiceImplementation implements UserService {
	
	private UserDAO ud;
	
	public UserServiceImplementation(UserDAO ud) {
		this.ud = ud;
	}
	
	
	
	@Override
	public User loginService(String username, String password) throws UserNotFoundException {
			User u = ud.login(username, password);
			//Entertainment720Launcher.setCurrentUser(u);
			return u;	
	}

}
