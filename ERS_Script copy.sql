drop schema if exists e_r_system cascade;
create schema e_r_system;
set schema 'e_r_system';

create table "ers_users_roles"(
	"ers_user_role_id" serial primary key,
	"user_role" text
);

create table "ers_users"(
	"ers_user_id" serial primary key,
	"ers_username" text unique not null,
	"ers_password" text not null,
	"user_first_name" text,
	"user_last_name" text,
	"user_email" text unique,
	"user_role_id" int references "ers_users_roles" ("ers_user_role_id")
);

create table "ers_reimbursement_type"(
	"reimb_type_id" serial primary key,
	"reimb_type" text
);

create table "ers_reimbursement_status"(
	"reimb_status_id" serial primary key,
	"reimb_status" text
);

create table "ers_reimbursement"(
	"reimb_id" serial primary key,
	"reimb_amount" numeric(10,2),
	"reimb_submitted" timestamp,
	"reimb_resolved" timestamp,
	"reimb_description" text,
	"reimb_recipt" text,
	"reimb_auther_id" int references "ers_users" ("ers_user_id"),
	"reimb_resolver_id" int references "ers_users" ("ers_user_id"),
	"reimb_status_id" int references "ers_reimbursement_status" ("reimb_status_id"),
	"reimb_type_id" int references "ers_reimbursement_type" ("reimb_type_id")
);

drop table "ers_reimbursement" cascade;

select * from "ers_users_roles";
		       
insert into "ers_users_roles" ("user_role") values('Employee');

insert into "ers_users" ("ers_username", "ers_password", "user_first_name" , "user_last_name" , "user_email", "user_role_id")
				values	('FManager', 'pass', 'Finance', 'Manager', 'fm@email.com', 1 );
			
-- insert into "ers_reimbursement" ("reimb_amount", "reimb_submitted", "reimb_description" , "reimb_recipt" , "reimb_auther_id", "user_role_id")
	--		values	('FManager', 'pass', 'Finance', 'Manager', 'fm@email.com', 1 );
			
			
select * from "ers_users";

delete from "ers_users" where "ers_user_id" = 2;

select "user_role" from "ers_users_roles" where "ers_user_role_id" = 1;

select * from "ers_users" as u inner join "ers_users_roles" as r 
							on u.user_role_id = r.ers_user_role_id 
							where "ers_username" = 'FManager' and "ers_password" = 'pass';

insert into "ers_reimbursement_status" ("reimb_status") values ('Pending');
								
select * from "ers_reimbursement_status";		
				
insert into "ers_reimbursement_type" ("reimb_type") values ('Other');

select * from "ers_reimbursement_type";	

select * from "ers_reimbursement";
 
select "reimb_type_id" from "ers_reimbursement_type" where "reimb_type" = 'Lodging';
				
				
				
select * from "ers_reimbursement" er inner join "ers_users" eu on er.reimb_auther_id = eu.ers_user_id;
				
				
update "ers_reimbursement" set "reimb_status_id" = 1, "reimb_resolver_id" = 3, "reimb_resolved" = '2021-01-03 14:05:17' WHERE "reimb_id" = 58;								
				
select * from "ers_users" where "ers_user_id" = 3;
				
				
				
				
	