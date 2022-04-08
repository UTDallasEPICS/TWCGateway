

const TaskForm = () => {
    return (
        <div class="container">
            <form class="form-inline justify-content-center">
                <div class="form-group col-7">
                    <input class="form-control col-12" type="text" 
                        placeholder="Create a new task"/>
                </div>
                <div class="form-group col-xs-2">
                    <input type="date" class="form-control" id="inlineFormInput"
                                placeholder="Deadline"/>
                </div>
                <div class="form-group col-3">
                    <button type="submit" class="form-control btn btn-primary ">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default TaskForm;

