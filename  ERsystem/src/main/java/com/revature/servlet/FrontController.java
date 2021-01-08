package com.revature.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.controllers.AuthController;
import com.revature.controllers.ReimbursementController;
import com.revature.exceptions.UserNotFoundException;

/**
 * Servlet implementation class FrontController
 */
public class FrontController extends HttpServlet {

	private AuthController authController = new AuthController();
	private ReimbursementController reimbursementController = new ReimbursementController();
	
protected void directControl(HttpServletRequest request, HttpServletResponse response) throws IOException, UserNotFoundException {
		
		String URI = request.getRequestURI().substring(request.getContextPath().length(), 
														 request.getRequestURI().length());
		
		switch (URI) {
			case "/login":{
				switch (request.getMethod()) {
					case "GET":
						response.setStatus(400);
						response.getWriter().write("Get ---- Method not Supported");
						break;
					case "POST":
						authController.userLogin(request,response);
						break;
					case "PUT":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;
					case "DELETE":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;

					default:
						break;
					}	
				}
				break;
			case "/employeeHome/reimbursementList":{
				switch (request.getMethod()) {
					case "GET":
						response.setStatus(400);
						response.getWriter().write("Get ---- Method not Supported");
						break;
					case "POST":
						reimbursementController.getList(request, response);
						break;
					case "PUT":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;
					case "DELETE":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;

					default:
						break;
					}	
				}
				break;
			case "/addReimbursement": 
				switch (request.getMethod()) {
					case "GET":{
						response.setStatus(400);
						response.getWriter().write("Method Not Supported");
						break;
					}
					case "POST":{
//						System.out.println("coming here******************************");
						reimbursementController.addReimb(request, response);
						break;
					}
					case "PUT":{
						response.setStatus(400);
						response.getWriter().write("Method Not Supported");
						break;
					}
					case "DELETE":{
						response.setStatus(400);
						response.getWriter().write("Method Not Supported");
						break;
					}
					default:{
						response.setStatus(400);
						response.getWriter().write("Method Not Supported");
						break;
					}
				}
				break;
			case "/managereHome/reimbursementList":{
				switch (request.getMethod()) {
					case "GET":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;
					case "POST":
//						System.out.println("in managerHome FrontController");
						reimbursementController.getAllList(request, response);
						break;
					case "PUT":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;
					case "DELETE":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;

					default:
						break;
					}	
				}
				break;
			case "/managereHome/reimbursementListbyStatus":{
				switch (request.getMethod()) {
					case "GET":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;
					case "POST":
//						System.out.println("in managerHome FrontController");
						reimbursementController.getFilteredList(request, response);
						break;
					case "PUT":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;
					case "DELETE":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;

					default:
						break;
					}	
				}
				break;
			case "/managerHome/statusUpdate":{
				switch (request.getMethod()) {
					case "GET":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;
					case "POST":
//						System.out.println("in status");
						reimbursementController.statusUpdate(request, response);
						break;
					case "PUT":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;
					case "DELETE":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;

					default:
						break;
					}	
				}
				break;
				
			case "/getUserByReimbID":{
				switch (request.getMethod()) {
					case "GET":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;
					case "POST":
						System.out.println("getUser");
						reimbursementController.getUser(request, response);
						break;
					case "PUT":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;
					case "DELETE":
						response.setStatus(400);
						response.getWriter().write("Method not Supported");
						break;

					default:
						break;
					}	
				}
				break;
			default:
				response.setStatus(404);
				response.getWriter().write("PAGE NOT FOUND");
				break;
		}
	}
	
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			directControl(request, response);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (UserNotFoundException e) {
			e.printStackTrace();
		}
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			directControl(request, response);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (UserNotFoundException e) {
			e.printStackTrace();
		}
	}

	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			directControl(request, response);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (UserNotFoundException e) {
			e.printStackTrace();
		}
	}


	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
