package com.revature.models;

import java.sql.Timestamp;
import java.util.Arrays;

public class Reimbursement {
	
	private int rID; 
	private double rAmount;
	private Timestamp rSubmitted, rResolved;
	private String rDesc;
	private String rRecipt;
	private int rAuthor, rResolver;
	private int rStatus, rType;
	public Reimbursement(int rID, double rAmount, Timestamp rSubmitted, Timestamp rResolved, String rDesc,
			String rRecipt, int rAuthor, int rResolver, int rStatus, int rType) {
		super();
		this.rID = rID;
		this.rAmount = rAmount;
		this.rSubmitted = rSubmitted;
		this.rResolved = rResolved;
		this.rDesc = rDesc;
		this.rRecipt = rRecipt;
		this.rAuthor = rAuthor;
		this.rResolver = rResolver;
		this.rStatus = rStatus;
		this.rType = rType;
	}
	public int getrID() {
		return rID;
	}
	public void setrID(int rID) {
		this.rID = rID;
	}
	public double getrAmount() {
		return rAmount;
	}
	public void setrAmount(double rAmount) {
		this.rAmount = rAmount;
	}
	public Timestamp getrSubmitted() {
		return rSubmitted;
	}
	public void setrSubmitted(Timestamp rSubmitted) {
		this.rSubmitted = rSubmitted;
	}
	public Timestamp getrResolved() {
		return rResolved;
	}
	public void setrResolved(Timestamp rResolved) {
		this.rResolved = rResolved;
	}
	public String getrDesc() {
		return rDesc;
	}
	public void setrDesc(String rDesc) {
		this.rDesc = rDesc;
	}
	public String getrRecipt() {
		return rRecipt;
	}
	public void setrRecipt(String rRecipt) {
		this.rRecipt = rRecipt;
	}
	public int getrAuthor() {
		return rAuthor;
	}
	public void setrAuthor(int rAuthor) {
		this.rAuthor = rAuthor;
	}
	public int getrResolver() {
		return rResolver;
	}
	public void setrResolver(int rResolver) {
		this.rResolver = rResolver;
	}
	public int getrStatus() {
		return rStatus;
	}
	public void setrStatus(int rStatus) {
		this.rStatus = rStatus;
	}
	public int getrType() {
		return rType;
	}
	public void setrType(int rType) {
		this.rType = rType;
	}
	@Override
	public String toString() {
		return "Reimbursement [rID=" + rID + ", rAmount=" + rAmount + ", rSubmitted=" + rSubmitted + ", rResolved="
				+ rResolved + ", rDesc=" + rDesc + ", rRecipt=" + rRecipt + ", rAuthor=" + rAuthor + ", rResolver="
				+ rResolver + ", rStatus=" + rStatus + ", rType=" + rType + "]";
	}
	
	
	
	

}
