import React from "react";
import DefaultTasks from "../pages/DefaultTasks";
import {useRef} from 'react';
//import { useAuth0 } from "@auth0/auth0-react";

// import {useState} from 'react'

const TaskForm = () => {
    const inputRef = useRef(null);
    const dateInputRef = useRef(null);
    const memberInputRef = useRef(null);
    const departmentInputRef = useRef(null);
    // const [output, setOutput] = useState("");

    // const handleSubmit = (e) => {
    
    //     e.preventDefault();

    //     console.log('Form submitted');    
    //     console.log(inputRef.current.value);
        
    //     DefaultTasksaddNewItem(inputRef.current.value);
    // }

    const handleSubmit = (event) => {
    

        console.log('Form submitted');    
        console.log(inputRef.current.value);
        console.log(dateInputRef.current.value);
        console.log(memberInputRef.current.value);
        console.log(departmentInputRef.current.value);
        event.preventDefault()
        let holder = [inputRef.current.value, dateInputRef.current.value, memberInputRef.current.value, departmentInputRef.current.value]
        DefaultTasks.addNewItem(holder);
    }

    return (
        
            <form onSubmit= {handleSubmit}>
                <div className="form-row">  
                    <div className="col-md-6 mb-3">
                        <input className="form-control" type="text" 
                            placeholder="Create a new task"
                            ref = {inputRef}
                            />
                    </div>
                    <div className="col-md-2 mb-3">
                        <input type="date" className="form-control" id="inlineFormInput"
                                    placeholder="Deadline" ref = {dateInputRef}/>
                    </div>
                    <div className="col-md  -8">
                        <input type="text" className="form-control" id="inlineFormInput"
                                    placeholder="Member assigned" ref = {memberInputRef}/>
                    </div>
                    <div className="col-md-8 mb-3">
                        <input type="text" className="form-control" id="inlineFormInput"
                                    placeholder="Department" ref = {departmentInputRef}/>
                    </div>
                    
                    <div class="col-md-2 mb-3">
                        <button type="submit" className="form-control btn btn-primary ">Submit</button>
                    </div>
                </div>
            </form>
        
    );
}

export default TaskForm;

