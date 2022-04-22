function retrieveTask(TID) {
    //contact and retrieve from tasks table

    const retrievedData = {
        TaskID: TID,
        Name: 'Requisition Form',
        Category: 'FDC', //First Day Clinic
        Assignee: 'Sarah Little, Hiring Manager',
        Timeline: 'First Day',
        TaskDescription: 'Required Trainings (Confidentiality, Universal Precautions, Safety, etc)',
        Location: null,
        Form: 'Requisition Form',
        Status: 'Incomplete',
        Comments: null
    }

    //return null if not found

    return retrievedData;

}

module.exports = { retrieveTask };

function createTask() {
    
}

function deleteTask() {

}

function updateTask() {

}

function createUser() {

}

function updateUserData() {

}

function deleteUser() {

}

function retrieveUser(UID) {

}
