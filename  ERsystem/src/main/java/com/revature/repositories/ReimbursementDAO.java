package com.revature.repositories;

import java.util.List;

import com.revature.models.NewReimbData;
import com.revature.models.NewStatusData;
import com.revature.models.Reimbursement;
import com.revature.models.User;

public interface ReimbursementDAO {
	
	public Boolean addReimbursement(NewReimbData newReimbData);

	public List<Reimbursement> getReimbursementByID(User u);

	public List<Reimbursement> getReimbursementByStatus(String status);

	public List<Reimbursement> getReimbursement();

	public Boolean statusUpdate(NewStatusData newStatusData);

	public User getUser(int rID);

}
