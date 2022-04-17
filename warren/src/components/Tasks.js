import React from 'react';

class CreateNewTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: null
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                TaskID: this.props.TaskID,
                Name: this.props.Name, 
                Category: this.props.Category,  
                Assignee: this.props.Assignee,
                Timeline: this.props.Timeline,
                TaskDescription: this.props.TaskDescription,
                TaskStatus: this.props.TaskStatus, 
                Location: this.props.Location,
                Form: this.props.Form, 
                Comments: this.props.Comments
             })
        };
        fetch('http://localhost:9000/CT', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
            
    }

    render() {
        return null;
    }
}

export { CreateNewTask }; 


class UpdateTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: null
        };
    }


    componentDidMount() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ //replace with variables that contains web page user input
                TaskID: this.props.TaskID,
                AttributeName: this.props.AttributeName,
                UpdatedValue: this.props.UpdatedValue
             })
        };
        fetch('http://localhost:9000/UT', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
            
    }

    render() {
        return null;
    }
}
export { UpdateTask }; 

class DeleteTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: null
        };
    }


    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                TaskID: this.props.TaskID
             })
        };
        fetch('http://localhost:9000/DT', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
            
    }

    render() {
        return null;
    }
}

export { DeleteTask }; 

class GetTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            TaskID: null,
            Name: null,
            Category: null,
            Assignee: null,
            Timeline: null,
            TaskDescription: null,
            Location: null,
            Form: null,
            Status: null,
            Comments: null
        };
    }

    componentDidMount() {
        const url = 'http://localhost:9000/GT/' + this.props.TaskID;
        console.log("Hey");
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                TaskID: data.TaskID,
                Category: data.Category, 
                Assignee: data.Assignee,
                Timeline: data.Timeline,
                TaskDescription: data.TaskDescription,
                Location: data.Location,
                Form: data.Form,
                Status: data.Status,
                Comments: data.Comments
            }));
            
    }

    render() {
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">GET Request</h5>
                <div className="card-body">
                    Task ID: {this.state.TaskID},
                    Task Description: {this.state.TaskDescription}
                </div>
            </div>
        );
    }
}

export { GetTask }; 