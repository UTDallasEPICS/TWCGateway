import React from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";
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
                    <div className="col-md-6 mb-3">
                        <input type="text" className="form-control" id="inlineFormInput"
                                    placeholder="Department" ref = {departmentInputRef}/>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="form-control" id="inlineFormInput"
                                    placeholder="Member assigned" ref = {memberInputRef}/>
                    </div>
                    <div className="col-sm-1">
                        <input className="form-control" type="number" 
                            placeholder="0"
                            ref = {inputRef}
                            />
                    </div>
                    <div className="col-sm-1">
                        <input type="radio" id="days" name = 'deadline' ref = {inputRef} value="days"/>
                        <label for="days">days</label><br/>
                        <input type="radio" id="weeks" name = 'deadline' ref = {inputRef} value="weeks"/>
                        <label for="weeks">weeks</label><br/>
                        <input type="radio" id="months" name = 'deadline' ref = {inputRef} value="months"/>
                        <label for="months">months</label><br/>
                    </div>
                    <div className="col-sm">
                        <input type="radio" id="beforeHire" name = 'deadlineTime' ref = {inputRef} value="before hire"/>
                        <label for="days">before hire</label><br/>
                        <input type="radio" id="afterHire" name = 'deadlineTime' ref = {inputRef} value="after hire"/>
                        <label for="weeks">after hire</label><br/>
                        <input type="radio" id="beforeStart" name = 'deadlineTime' ref = {inputRef} value="before start"/>
                        <label for="days">before start</label><br/>
                        <input type="radio" id="afterStart" name = 'deadlineTime' ref = {inputRef} value="after start"/>
                        <label for="weeks">after start</label><br/>
                    </div>
                </div>
                <div class="col-md-2 mb-3">
                    <button type="submit" className="form-control btn btn-primary ">Submit</button>
                </div>
                <div className="form-row">
                </div>
            </form>
        
    );
}

export default TaskForm;

