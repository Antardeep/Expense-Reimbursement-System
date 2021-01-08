package com.revature.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.models.NewReimbData;
import com.revature.models.NewStatusData;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.repositories.ReimbursementDAO;
import com.revature.repositories.ReimbursementPostgresDAO;
import com.revature.services.ReimbursementService;
import com.revature.services.ReimbursementServiceImp;


public class ReimbursementController {
	
	private ReimbursementDAO rDAO = new ReimbursementPostgresDAO();
	private ReimbursementService rs = new ReimbursementServiceImp(rDAO);
	
	private ObjectMapper om = new ObjectMapper();
	
	public void addReimb(HttpServletRequest request, HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException {
		NewReimbData newReimbData = om.readValue(request.getInputStream(), NewReimbData.class);
		
//		System.out.println(newReimbData.getRecipt());
//		System.out.println("in Controller for reimb and auth id = " + newReimbData.getAuthor().getUserID());
		Boolean r = rs.addReimbService(newReimbData);
		response.setStatus(200);
		response.getWriter().write(om.writeValueAsString(r));
	
		
	}
	
	public void getList(HttpServletRequest request, HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException{
		User u =  om.readValue(request.getInputStream(), User.class);
		
//		System.out.println(u.getUserID());
		
		List<Reimbursement> list=new ArrayList<Reimbursement>();
		list = rs.getReimbursementByIDService(u);
		
		response.setStatus(200);
		response.getWriter().write(om.writeValueAsString(list));
	}
	
	public void getFilteredList(HttpServletRequest request, HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException{
		BufferedReader r = request.getReader();
//		System.out.println(status.lines().collect(Collectors.joining()) + "==status");
		
		String status = r.lines().collect(Collectors.joining());
		List<Reimbursement> list=new ArrayList<Reimbursement>();
		list = rs.getReimbursementByStatusService(status);
		
		response.setStatus(200);
		response.getWriter().write(om.writeValueAsString(list));
	}

	public void getAllList(HttpServletRequest request, HttpServletResponse response) throws JsonProcessingException, IOException {
		List<Reimbursement> list=new ArrayList<Reimbursement>();
		list = rs.getReimbursementService();
		
		response.setStatus(200);
		response.getWriter().write(om.writeValueAsString(list));
	}

	public void statusUpdate(HttpServletRequest request, HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException {
		NewStatusData newStatusData = om.readValue(request.getInputStream(), NewStatusData.class);
		
		System.out.println(newStatusData.getrID());
//		System.out.println("in Controller for reimb and auth id = " + newReimbData.getAuthor().getUserID());
		Boolean r = rs.statusUpdateService(newStatusData);
		response.setStatus(200);
		response.getWriter().write(om.writeValueAsString(r));
		
	}

	public void getUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
//		int rID  = Integer.parseInt(request.getParameter("reimbID"));
		BufferedReader r = request.getReader();
//		System.out.println(status.lines().collect(Collectors.joining()) + "==status");
		
		String rID = r.lines().collect(Collectors.joining());
		System.out.println(">>>>>>"+ rID);
		
		User u = rs.getUserService(Integer.parseInt(rID));
		
		response.setStatus(200);
		response.getWriter().write(om.writeValueAsString(u));
		
	}

}
