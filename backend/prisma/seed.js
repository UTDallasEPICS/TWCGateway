// Step 1: Define the departments
let departments = [
    { id: 1, name: 'Department 1' },
    { id: 2, name: 'Department 2' },
    // add more departments as needed
]

// Step 2: Define the roles
let roles = [
    { id: 1, name: 'Role 1' },
    { id: 2, name: 'Role 2' },
    // add more roles as needed
]

// Step 3: Define the users
let users = [
    { id: 1, name: 'User 1', roleId: 1, departmentId: 1 },
    { id: 2, name: 'User 2', roleId: 2, departmentId: 1 },
    { id: 3, name: 'User 3', roleId: 1, departmentId: 2 },
    { id: 4, name: 'User 4', roleId: 2, departmentId: 2 },
    { id: 5, name: 'User 5', roleId: 1, departmentId: 1 },
    // add more users as needed
]

// Step 4: Map each user to a role
users.forEach((user) => {
    let role = roles.find((role) => role.id === user.roleId)
    user.role = role
})

// Step 5: Map each user to a department
users.forEach((user) => {
    let department = departments.find((department) => department.id === user.departmentId)
    user.department = department
})
