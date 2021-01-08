package com.revature.models;

import java.util.Arrays;

public class NewReimbData {
	
	 private double amount;
	 private String desc;
	 private String recipt;
	 private String type;
	 private User author;
	public NewReimbData(double amount, String desc, String recipt, String type, User author) {
		super();
		this.amount = amount;
		this.desc = desc;
		this.recipt = recipt;
		this.type = type;
		this.author = author;
	}
	
	public NewReimbData() {
		super();
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getRecipt() {
		return recipt;
	}
	public void setRecipt(String recipt) {
		this.recipt = recipt;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public User getAuthor() {
		return author;
	}
	public void setAuthor(User author) {
		this.author = author;
	}
	@Override
	public String toString() {
		return "NewReimbData [amount=" + amount + ", desc=" + desc + ", recipt=" + recipt + ", type=" + type
				+ ", author=" + author + "]";
	}
	 
	
	 

	 
}
