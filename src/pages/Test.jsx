import React from "react"
import  ReactDOM  from "react-dom";

class Test extends React.Component{
    render(){
        return <h1>This is a test page</h1>;
    }
}

ReactDOM.render(<Test />, document.getElementById('Test'));
 
export default Test;

//<Route path='/test' element = {<Test/>}/>