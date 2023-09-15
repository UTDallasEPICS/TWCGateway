-- CreateTable
CREATE TABLE "employee" (
    "name" VARCHAR(30),
    "password" VARCHAR(30),
    "email" VARCHAR(30) NOT NULL,
    "accountid" SERIAL NOT NULL,
    "account_role" VARCHAR(30),
    "account_department" VARCHAR(60),

    CONSTRAINT "accountID_pkey" PRIMARY KEY ("accountid")
);

-- CreateTable
CREATE TABLE "task_list" (
    "task_id" SERIAL NOT NULL,
    "task_description" VARCHAR(125) DEFAULT 'no task description',
    "department_name" VARCHAR(60) NOT NULL DEFAULT 'Basic Onboarding',
    "deadline" DATE NOT NULL,
    "confirm_status" BOOLEAN NOT NULL DEFAULT false,
    "confirm_date" DATE,
    "employee_name" VARCHAR(60),
    "member_assigned" VARCHAR(60),
    "assigned_employee_id" INTEGER,
    "task_num" SERIAL NOT NULL,

    CONSTRAINT "task_list_pkey" PRIMARY KEY ("task_id")
);

-- AddForeignKey
ALTER TABLE "task_list" ADD CONSTRAINT "employee_foreign_key" FOREIGN KEY ("assigned_employee_id") REFERENCES "employee"("accountid") ON DELETE NO ACTION ON UPDATE NO ACTION;
