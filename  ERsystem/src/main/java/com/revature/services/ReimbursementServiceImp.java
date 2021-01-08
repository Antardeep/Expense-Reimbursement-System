package com.revature.services;

import java.util.List;

import com.revature.models.NewReimbData;
import com.revature.models.NewStatusData;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.repositories.ReimbursementDAO;
import com.revature.repositories.ReimbursementPostgresDAO;

public class ReimbursementServiceImp implements ReimbursementService{
	
	private ReimbursementDAO rDAO = new ReimbursementPostgresDAO();

	public ReimbursementServiceImp(ReimbursementDAO rDAO) {
		this.rDAO = rDAO;
	}

	@Override
	public Boolean addReimbService(NewReimbData newReimbData) {
//		System.out.println("in service ");
		return rDAO.addReimbursement(newReimbData);
	}
	
	@Override
	public List<Reimbursement> getReimbursementByIDService(User u){
		return rDAO.getReimbursementByID(u);
	}

	@Override
	public List<Reimbursement> getReimbursementByStatusService(String status) {
		return rDAO.getReimbursementByStatus(status);
	}

	@Override
	public List<Reimbursement> getReimbursementService() {
		return rDAO.getReimbursement();
	}

	@Override
	public Boolean statusUpdateService(NewStatusData newStatusData) {
		return rDAO.statusUpdate(newStatusData);
	}

	@Override
	public User getUserService(int rID) {
		return rDAO.getUser(rID);
	}

}
