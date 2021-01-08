package com.revature.exceptions;

public class InternalErrorException extends RuntimeException {
	public InternalErrorException() {
		super("OOPS, something went wrong");
	}
}
