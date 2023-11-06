import React from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";
import DefaultTasks from "../pages/DefaultTasks";
import {useRef, useState} from 'react';
import axios from "axios";
//import { useAuth0 } from "@auth0/auth0-react";

// import {useState} from 'react'

const TaskForm = () => {
    const inputRef = useRef(null);
    const dateInputRef = useRef(null);
    const memberInputRef = useRef(null);
    const [departmentInputRef, setdepartment] = useState('');
    const timeValRef = useRef(null);
    const timeRef = useRef(null);
    const befAfterRef = useRef(null);
    // const [output, setOutput] = useState("");

    // const handleSubmit = (e) => {
    
    //     e.preventDefault();

    //     console.log('Form submitted');    
    //     console.log(inputRef.current.value);
        
    //     DefaultTasksaddNewItem(inputRef.current.value);
    // }

    const handleSubmit = () => {
        //e.preventDefault();
        //window.location.reload(false);
        console.log('Form submitted');    
        console.log(inputRef.current.value);
        console.log(departmentInputRef);
        console.log(memberInputRef.current.value);
        console.log(timeValRef.current.value);
        console.log(timeRef.current.value);
        console.log(befAfterRef.current.value);
        let holder = [inputRef.current.value, departmentInputRef, memberInputRef.current.value, timeValRef.current.value, timeRef.current.value, befAfterRef.current.value]
        fetchTaskDb(holder);
        //DefaultTasks.addNewItem(holder);
    }

    const fetchTaskDb = async(holder) =>{ 
        console.log(holder);
        try{
        //   await fetch("http://localhost:5010/insertTask/" + holder[0] +"/"+ holder[1] +"/"+ holder[2] +"/"+ holder[3] +"/"+ holder[4] +"/"+ holder[5], {
        //     method: "POST",
        //   });

          const { data } = await axios.post("http://localhost:5010/addTask", {
            taskName: holder[0],
            department: holder[1],
            member: holder[2],
            timeVal: holder[3],
            time: holder[4],
            befAfter: holder[5]
          });
        }
        catch(e)
        {
          console.log(e); 
          console.log("there was an error"); 
        }
      };

    return (
        
            <form onSubmit= {handleSubmit}>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <input className="form-control" type="text" 
                            placeholder="Create a new task"
                            ref = {inputRef}
                            />
                    </div>
                    <Label className="col-md-6 mb-3">
                        <Input required type="select" className="form-control" id="inlineFormInput"
                                    placeholder="Department" onChange = {(e) => setdepartment(e.target.value)}>
                                    <option>Select Department</option>
                                    <option>Basic Onboarding</option>
                                    <option>Billing</option>
                                    <option>E.C.I</option>
                        </Input>
                    </Label>
                    <div className="col-md-4">
                        <input type="text" className="form-control" id="inlineFormInput"
                                    placeholder="Member assigned" ref = {memberInputRef}/>
                    </div>
                    <div className="col-sm-1">
                        <input className="form-control" type="number" 
                            placeholder="0"
                            ref = {timeValRef}
                            />
                    </div>
                    <div className="col-sm-1">
                        <input type="radio" id="Days" name = 'deadline' ref = {timeRef} value="Days"/>
                        <label for="Days">Days</label><br/>
                        <input type="radio" id="Weeks" name = 'deadline' ref = {timeRef} value="Weeks"/>
                        <label for="Weeks">Weeks</label><br/>
                        <input type="radio" id="Months" name = 'deadline' ref = {timeRef} value="Months"/>
                        <label for="Months">Months</label><br/>
                    </div>
                    <div className="col-sm">
                        <input type="radio" id="beforeStart" name = 'deadlineTime' ref = {befAfterRef} value="before start"/>
                        <label for="days">Before start</label><br/>
                        <input type="radio" id="afterStart" name = 'deadlineTime' ref = {befAfterRef} value="after start"/>
                        <label for="weeks">After start</label><br/>
                    </div>
                </div>
                <div class="mb-3">
                    <button type="submit" className="form-control btn btn-primary ">Submit</button>
                </div>
                <div className="form-row">
                </div>
            </form>
        
    );
}

export default TaskForm;

