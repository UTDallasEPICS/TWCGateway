import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const TaskForm = () => {


    return (
        
            <form>
                <div class="form-row">
                    <div class="col-md-8 mb-3">
                        <input class="form-control" type="text" 
                            placeholder="Create a new task"/>
                    </div>
                    <div class="col-md-2 mb-3">
                        <input type="date" class="form-control" id="inlineFormInput"
                                    placeholder="Deadline"/>
                    </div>
                    <div class="col-md-2 mb-3">
                        <button type="submit" class="form-control btn btn-primary ">Submit</button>
                    </div>
                </div>
            </form>
        
    );
}

export default TaskForm;

