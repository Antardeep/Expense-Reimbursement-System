package com.revature.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.revature.models.NewReimbData;
import com.revature.models.NewStatusData;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.util.ConnectionFactory;

public class ReimbursementPostgresDAO implements ReimbursementDAO{
	private ConnectionFactory cf = ConnectionFactory.getConnectionFactory();

	@Override
	public Boolean addReimbursement(NewReimbData newReimbData) {
//		System.out.println("in DAo");
		Connection conn = cf.getConnection();
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		try {
			
			conn.setAutoCommit(false);
			String typeSQL ="select * from \"ers_reimbursement_type\" where \"reimb_type\" = ?;";
			PreparedStatement getType = conn.prepareStatement(typeSQL);
			getType.setString(1, newReimbData.getType());
			ResultSet r = getType.executeQuery();
			int typeID = 0;
			if(r.next()) {
				typeID = r.getInt("reimb_type_id");
			}else {
				throw new SQLException();
			}
			
			String reimbursementSQL = "insert into \"ers_reimbursement\" (\"reimb_amount\", \"reimb_submitted\", \"reimb_description\" , \"reimb_recipt\" , \"reimb_auther_id\", \"reimb_status_id\", \"reimb_type_id\")\n"
					+ "	values	(?, ?, ?, ?, ?, ?, ?) returning \"reimb_id\";";
			
			PreparedStatement insertReimbursement = conn.prepareStatement(reimbursementSQL);
			insertReimbursement.setDouble(1, newReimbData.getAmount());
			insertReimbursement.setTimestamp(2, timestamp );
			insertReimbursement.setString(3, newReimbData.getDesc());
			insertReimbursement.setString(4, newReimbData.getRecipt());
			insertReimbursement.setInt(5, newReimbData.getAuthor().getUserID());
			insertReimbursement.setInt(6, 3);
			insertReimbursement.setInt(7, typeID);
		
			ResultSet rs = insertReimbursement.executeQuery();
			
			if (rs.next()) {
				int reimbID = rs.getInt("reimb_id");
				return true;
			} else {
				throw new SQLException();
			}
			
		} catch (SQLException e1) {
			e1.printStackTrace();
			try {
				conn.rollback();
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		} finally {
			try {
				conn.commit();
				conn.setAutoCommit(true);
			} catch (SQLException e3) {
				e3.printStackTrace();
			}
			cf.releaseConnection(conn);
		}
		return null;
	}


	@Override
	public List<Reimbursement> getReimbursementByID(User u) {
		Connection conn = cf.getConnection();
		try {
			String getReimbursementsSQL = "select * from \"ers_reimbursement\" where \"reimb_auther_id\" = ?;";
			PreparedStatement getReimb = conn.prepareStatement(getReimbursementsSQL);
			getReimb.setInt(1, u.getUserID());
			
			ResultSet rs = getReimb.executeQuery();
			
			List<Reimbursement> list=new ArrayList<Reimbursement>();
			
			while (rs.next()) {
				int rID = rs.getInt("reimb_id"); 
				double rAmount = rs.getDouble("reimb_amount");
				Timestamp rSubmitted = rs.getTimestamp("reimb_submitted");
				Timestamp rResolved = rs.getTimestamp("reimb_resolved");
				String rDesc =  rs.getString("reimb_description");
				String rRecipt =  rs.getString("reimb_recipt");
				int rAuthor =  rs.getInt("reimb_auther_id");
				int rResolver =  rs.getInt("reimb_resolver_id");
				int rStatus =  rs.getInt("reimb_status_id");
				int rType =  rs.getInt("reimb_type_id");
			

				Reimbursement r = new Reimbursement(rID, rAmount, rSubmitted, rResolved, rDesc, rRecipt, rAuthor, rResolver, rStatus, rType);

				list.add(r);
			}
			return list;
			
		}catch(SQLException e) {
			e.printStackTrace();
		} finally {
			cf.releaseConnection(conn);
		}
		return null;
	}


	@Override
	public List<Reimbursement> getReimbursementByStatus(String status) {
		Connection conn = cf.getConnection();
		try {
			
			String statusSQL ="select * from \"ers_reimbursement_status\" where \"reimb_status\" = ?;";
			PreparedStatement getStatus = conn.prepareStatement(statusSQL);
			getStatus.setString(1, status);
			ResultSet rs1 = getStatus.executeQuery();
			int statusID = 0;
			if(rs1.next()) {
				statusID = rs1.getInt("reimb_status_id");
			}else {
				throw new SQLException();
			}
			
			String getReimbursementsSQL = "select * from \"ers_reimbursement\" where \"reimb_status_id\" = ?;";
			PreparedStatement getReimb = conn.prepareStatement(getReimbursementsSQL);
			getReimb.setInt(1, statusID);
			
			ResultSet rs = getReimb.executeQuery();
			
			List<Reimbursement> list=new ArrayList<Reimbursement>();
			
			while (rs.next()) {
				int rID = rs.getInt("reimb_id"); 
				double rAmount = rs.getDouble("reimb_amount");
				Timestamp rSubmitted = rs.getTimestamp("reimb_submitted");
				Timestamp rResolved = rs.getTimestamp("reimb_resolved");
				String rDesc =  rs.getString("reimb_description");
				String rRecipt =  rs.getString("reimb_recipt");
				int rAuthor =  rs.getInt("reimb_auther_id");
				int rResolver =  rs.getInt("reimb_resolver_id");
				int rStatus =  rs.getInt("reimb_status_id");
				int rType =  rs.getInt("reimb_type_id");
			

				Reimbursement r = new Reimbursement(rID, rAmount, rSubmitted, rResolved, rDesc, rRecipt, rAuthor, rResolver, rStatus, rType);

				list.add(r);
			}
			return list;
			
		}catch(SQLException e) {
			e.printStackTrace();
		} finally {
			cf.releaseConnection(conn);
		}
		return null;
	}


	@Override
	public List<Reimbursement> getReimbursement() {
		Connection conn = cf.getConnection();
		try {
			String getReimbursementsSQL = "select * from \"ers_reimbursement\";";
			Statement getReimb = conn.createStatement();
		
			ResultSet rs = getReimb.executeQuery(getReimbursementsSQL);
		
			List<Reimbursement> list=new ArrayList<Reimbursement>();
		
			while (rs.next()) {
				int rID = rs.getInt("reimb_id"); 
				double rAmount = rs.getDouble("reimb_amount");
				Timestamp rSubmitted = rs.getTimestamp("reimb_submitted");
				Timestamp rResolved = rs.getTimestamp("reimb_resolved");
				String rDesc =  rs.getString("reimb_description");
				String rRecipt =  rs.getString("reimb_recipt");
				int rAuthor =  rs.getInt("reimb_auther_id");
				int rResolver =  rs.getInt("reimb_resolver_id");
				int rStatus =  rs.getInt("reimb_status_id");
				int rType =  rs.getInt("reimb_type_id");
		

				Reimbursement r = new Reimbursement(rID, rAmount, rSubmitted, rResolved, rDesc, rRecipt, rAuthor, rResolver, rStatus, rType);

				list.add(r);
			}
			return list;
		
		}catch(SQLException e) {
			e.printStackTrace();
		} finally {
			cf.releaseConnection(conn);
		}
		return null;
	}


	@Override
	public Boolean statusUpdate(NewStatusData newStatusData) {
		Connection conn = cf.getConnection();
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		try {
			
			conn.setAutoCommit(false);
			String statusSQL ="select * from \"ers_reimbursement_status\" where \"reimb_status\" = ?;";
			PreparedStatement getStatus = conn.prepareStatement(statusSQL);
			getStatus.setString(1, newStatusData.getStatus());
			ResultSet r = getStatus.executeQuery();
			int statusID = 0;
			if(r.next()) {
				statusID = r.getInt("reimb_status_id");
			}else {
				throw new SQLException();
			}
			
			String reimbursementSQL = "update \"ers_reimbursement\" set \"reimb_status_id\" = ?, \"reimb_resolver_id\" = ?, \"reimb_resolved\" = ? WHERE \"reimb_id\" = ?;	";
			
			PreparedStatement insertReimbursement = conn.prepareStatement(reimbursementSQL);
			insertReimbursement.setInt(1, statusID);
			insertReimbursement.setInt(2, newStatusData.getResolverID());
			insertReimbursement.setTimestamp(3, timestamp );
			insertReimbursement.setInt(4, newStatusData.getrID());
		
			int i = insertReimbursement.executeUpdate();
			System.out.println(i);
//			if (i) {
//				return true;
//			} else {
//				throw new SQLException();
//			}
			return true;
			
		} catch (SQLException e1) {
			e1.printStackTrace();
			try {
				conn.rollback();
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		} finally {
			try {
				conn.commit();
				conn.setAutoCommit(true);
			} catch (SQLException e3) {
				e3.printStackTrace();
			}
			cf.releaseConnection(conn);
		}
		return null;
	}


	@Override
	public User getUser(int rID) {
		Connection conn = cf.getConnection();
		try {
			conn.setAutoCommit(false);
			String statusSQL ="select * from \"ers_users\" where \"ers_user_id\" = ?;";
			PreparedStatement getStatus = conn.prepareStatement(statusSQL);
			getStatus.setInt(1, rID);
			ResultSet res = getStatus.executeQuery();
			
			if(res.next()) {
				User u = new User();
				u.setUserID(res.getInt("ers_user_id"));
				u.setUsername(res.getString("ers_username"));
				u.setPassword(res.getString("ers_password"));
				u.setFirstName(res.getString("user_first_name"));
				u.setLastName(res.getString("user_last_name"));
				u.setEmail(res.getString("user_email"));
				u.setUserRole(res.getString("user_role_id"));
				
				return u;
			}else {
				throw new SQLException();
			}
		} catch (SQLException e1) {
			e1.printStackTrace();
			try {
				conn.rollback();
			} catch (SQLException e2) {
				e2.printStackTrace();
			}
		} finally {
			try {
				conn.commit();
				conn.setAutoCommit(true);
			} catch (SQLException e3) {
				e3.printStackTrace();
			}
			cf.releaseConnection(conn);
		}
		return null;
	}


}
