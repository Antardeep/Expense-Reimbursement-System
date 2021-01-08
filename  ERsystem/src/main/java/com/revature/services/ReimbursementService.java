package com.revature.services;

import java.util.List;

import com.revature.models.NewReimbData;
import com.revature.models.NewStatusData;
import com.revature.models.Reimbursement;
import com.revature.models.User;

public interface ReimbursementService {
	
	public Boolean addReimbService(NewReimbData newReimbData);
	
	public List<Reimbursement> getReimbursementByIDService(User u);

	public List<Reimbursement> getReimbursementByStatusService(String status);

	public List<Reimbursement> getReimbursementService();

	public Boolean statusUpdateService(NewStatusData newStatusData);

	public User getUserService(int rID);

}
