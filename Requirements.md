# **Requirements**
#### **This application has different website views depending on the user's role.**

**Admin View:**
- Login/Logout of account
- Users page: 
   - search for any user by name
   - add users of any role
   - edit users to change their role, department, etc.
   - archive users that have completed their onboarding progress or no longer need access to the onboarding site
   - navigate to individual supervisor pages and view the tasks they are in charge of
   - navigate to individual employee pages and view/update their task progress
- Departments page
   - view all departments and the number of employees in each
   - search for any department by name
   - add/edit/archive departments
   - navigate to individual department pages to view/add/search/archive tasks of the department
- Archive page
   - view the lists of users and departments that are archived
   - restore/unarchive any selected users and departments
- Scan excel sheets to automatically add users/tasks/departments to the database

**Supervisor View:**
- Login/Logout of account
- View a list of tasks and the employees assigned to each task
- Update each employee's task completion progress
- Receive weekly progress reports of employee progress by email

**Employee View:**
- Login/Logout of account
- View a list of tasks to be completed
- Receive email notifications of any new tasks to be completed

### **Database:**
- Stores information about users
    - name, email, role (admin, supervisor, employee), any mappings depending on role, archived (T/F)
- Stores information about tasks
    - description, tag (typically representative of the employee's onboarding progress i.e Pre-Hire, First Day), any mappings, archived
- Stores information about departments
    - name, any mappings, archived
- Mappings:
   - DepartmentUserMapping - if user role = onboarding employee, they can be mapped to a department
   - SupervisorTaskMapping - if user role = supervisor, they are mapped to tasks of which they are in charge of checking off
   - OnboardingEmployeeTaskMapping - if user role = employee, they can be mapped to a task which they must complete
   - DepartmentTaskMapping - maps a task to a department

### **Authentication:**
- Currently handled by Auth0
- Must contact The Warren Center's IT firm to connect their database of users to the Auth0 tenant
