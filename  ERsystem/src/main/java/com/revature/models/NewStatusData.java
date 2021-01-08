package com.revature.models;

public class NewStatusData {
	
	private int rID;
	private String status;
	private int resolverID;
	public NewStatusData(int rID, String status, int resolverID) {
		super();
		this.rID = rID;
		this.status = status;
		this.resolverID = resolverID;
	}
	
	public NewStatusData() {
		super();
	}
	public int getrID() {
		return rID;
	}
	public void setrID(int rID) {
		this.rID = rID;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getResolverID() {
		return resolverID;
	}
	public void setResolverID(int resolverID) {
		this.resolverID = resolverID;
	}
	@Override
	public String toString() {
		return "NewStatusData [rID=" + rID + ", status=" + status + ", resolverID=" + resolverID + "]";
	}

	
	

}
