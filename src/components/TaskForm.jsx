import React from "react";
import DefaultTasks from "../pages/DefaultTasks";
import {useRef} from 'react';
//import { useAuth0 } from "@auth0/auth0-react";

// import {useState} from 'react'

const TaskForm = () => {
    const inputRef = useRef(null);
    // const [output, setOutput] = useState("");

    // const handleSubmit = (e) => {
    
    //     e.preventDefault();

    //     console.log('Form submitted');    
    //     console.log(inputRef.current.value);
        
    //     DefaultTasksaddNewItem(inputRef.current.value);
    // }

    const handleSubmit = () => {
    

        console.log('Form submitted');    
        console.log(inputRef.current.value);
        
        DefaultTasks.addNewItem(inputRef.current.value);
    }

    return (
        
            <form onSubmit= {handleSubmit}>
                <div className="form-row">  
                    <div className="col-md-8 mb-3">
                        <input className="form-control" type="text" 
                            placeholder="Create a new task"
                            ref = {inputRef}
                            />
                    </div>
                    <div className="col-md-2 mb-3">
                        <input type="date" className="form-control" id="inlineFormInput"
                                    placeholder="Deadline"/>
                    </div>
                    <div class="col-md-2 mb-3">
                        <button type="submit" className="form-control btn btn-primary ">Submit</button>
                    </div>
                </div>
            </form>
        
    );
}

export default TaskForm;

