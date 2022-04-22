class CreateUser extends React.Component {
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
                UserID: this.props.UID,
                FirstName: this.props.FirstName,
                LastName: this.props.LastName, 
                Email: this.props.Email,  
                Address: this.props.Address,
                Phone: this.props.Phone,
                Status: this.props.Status,
                Comments: this.props.Comments
             })
        };
        fetch('http://localhost:9000/CU', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
            
    }

    render() {
        const { postId } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Simple POST Request</h5>
                <div className="card-body">
                    Returned Id: {postId}
                </div>
            </div>
        );
    }
}

export { CreateUser }; 
