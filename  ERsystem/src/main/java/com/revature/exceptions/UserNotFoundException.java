package com.revature.exceptions;

public class UserNotFoundException extends Exception{
	
	public UserNotFoundException() {
		super("User not exists");
	}

}
