# Expense-Reimbursement-System

The Expense Reimbursement System (ERS) will manage the process of reimbursing employees for expenses incurred while on company time. All employees in the company can login and submit requests for reimbursement and view their past tickets and pending requests. Finance managers can log in and view all reimbursement requests and past history for all employees in the company. Finance managers are authorized to approve and deny requests for expense reimbursement.

## Technologies Used

React JS: version 17.0.1\
Material UI: version 4.11.2\
ECMAScript 6 / Javascript / HTML5 / CSS3\
AJAX\
Java: version 1.8\
Servlets: version 3.1.0\
JDBC\
SQL / PostgreSQL: version 42.2.18\
AWS - RDS\
Maven: version 1.8\
Tomcat: version 9.0\
Git\
Visual Studio Code\
Eclipse: Spring Tool Suit 4

## Features

### Employee: 
1. Login
2. Add Reimbursement Request -> Reimbursement Types: Employees can select the type of reimbursement as: LODGING, TRAVEL, FOOD, or OTHER
3. Can Upload the reciept of expenses.
4. View past tickets - Approved / Pending / Rejected

### Finance Manager
1. Login
2. View all reimbursement requests from all employees
3. Can View the reciept of expenses the employee uploaded.
4. Filter request by status - Pending/ Approved / Denied
5. Approve or Deny reimbursement request
![Alt](/usecase.png "usecase")

### Used CSS Animations for making UI Appealing

## Getting Started

-> Git clone https://github.com/Antardeep/Expense-Reimbursement-System.git\
-> change directory to frontend and do -> npm install\
-> run code using command -> npm start\
-> Open ERsystem in Eclipse or IntelliJ\
-> Run the code on Tomcat Server\
The application is ready to use\

## Usage
- Login as either an Employee or as a Manager
- Employee can apply for reimbursement
- Employee can view all personal past tickets
- Employee can logout
- Manager can view all tickets (both current and past)
- Manager can approve/decline tickets by looking at request details and reciept.
- Manager can filter by ticket status (approved, pending, denied)
- Manager can logout
![Alt](/activity.png "activity")

## Development Tool
- Eclipse - Spring Tools Suit 4
- Visual Studio code
- Postman
- DBeaver

## ER Diagram
![Alt](/ERD.png "ERD")

## License

The project is under the GNU General Public License





